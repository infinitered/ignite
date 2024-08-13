import { observer } from "mobx-react-lite"
import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, useWindowDimensions, StyleSheet, Animated } from 'react-native';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { Text } from '~/components/ui/text';
import RenderHtml from 'react-native-render-html';
import { isRTL } from "../i18n"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
) {

  const [articleData, setArticleData] = useState(null);
  const [currentArticle, setCurrentArticle] = useState('Theoretical_physics');
  const { width } = useWindowDimensions();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fetchWikipediaArticle(currentArticle);
  }, [currentArticle]);

  const fetchWikipediaArticle = async (article) => {
    // Fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(async () => {
      try {
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/mobile-html/${article}`
        );
        const html = await response.text();
        
        const titleMatch = html.match(/<span class="mw-page-title-main"[^>]*>(.*?)<\/span>/);
        const title = titleMatch ? titleMatch[1].trim() : article.replace('_', ' ');
        
        const sectionRegex = /<section[^>]*>[\s\S]*?<h2[^>]*>(.*?)<\/h2>[\s\S]*?(<p>[\s\S]*?)<\/section>/g;
        const sections = [];
        let match;
        while ((match = sectionRegex.exec(html)) !== null) {
          const content = match[2].replace(/<img[^>]*>/g, '').trim();
          
          sections.push({
            title: match[1].replace(/<[^>]*>/g, '').trim(),
            content: content,
          });
        }
        setArticleData({ title, sections });

        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.error('Error fetching Wikipedia article:', error);
      }
    });
  };

  const tagsStyles = {
    body: { color: 'white' },
    p: { color: 'white', fontSize: '1.2rem'  },
    h1: { color: 'white' },
    h2: { color: 'white' },
    h3: { color: 'white' },
    a: { color: '#ADA8F6' },
  };

  const handleLinkPress = (event, href) => {
    event.preventDefault();
    const topicName = href.startsWith('about:///') ? href.replace('about:///', '') : href;
    setCurrentArticle(topicName);
  };

  const renderersProps = {
    a: {
      onPress: handleLinkPress
    }
  };

  return (
    <Animated.ScrollView style={{ opacity: fadeAnim }}>
      
      <View className="w-full flex justify-center">
        <Text  className="text-5xl text-white my-4 font-bold px-4 py-4">
          {articleData?.title || 'Loading...'}
        </Text>
        <Accordion
          type="multiple"
          collapsible
          defaultValue={['item-0']}
          className="w-full px-2 text-white"
        >
          {articleData?.sections.map((section, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>
                <Text className="text-white">{section.title}</Text>
              </AccordionTrigger>
              <AccordionContent>
                <RenderHtml 
                  contentWidth={width} 
                  source={{ html: section.content }} 
                  tagsStyles={tagsStyles}
                  renderersProps={renderersProps}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </View>
    </Animated.ScrollView>
  );
})

