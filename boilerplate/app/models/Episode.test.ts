import { EpisodeModel } from "./Episode"

const data = {
  guid: "f91f2ea0-378a-4a90-9a83-d438a0cc32f6",
  title: "RNR 244 - Rewriting GasBuddy in React Native",
  pubDate: "2022-01-20 21:05:36",
  link: "https://www.reactnativeradio.com/",
  author:
    "rnradio@infinite.red (Max Metral, Mark Rickert, Jamon Holmgren, Robin Heinze, Mazen Chami)",
  thumbnail:
    "https://image.simplecastcdn.com/images/fd1212b1-7d08-4c5a-8506-00188a4c6528/acb9f5dc-7451-42af-8c97-2f0f29d122ae/3000x3000/rnr-episode-rnr244.jpg?aid=rss_feed",
  description: "",
  content: "",
  enclosure: {
    link: "https://www.simplecast.com/podcasts/rnr/rnr244",
    type: "audio/mpeg",
    length: 0,
    duration: 2578,
    rating: {
      scheme: "urn:simplecast:classification",
      value: "clean",
    },
  },
}
const episode = EpisodeModel.create(data)

test("publish date format", () => {
  expect(episode.datePublished.textLabel).toBe("Jan 20, 2022")
  expect(episode.datePublished.accessibilityLabel).toBe(
    'demoPodcastListScreen.accessibility.publishLabel {"date":"Jan 20, 2022"}',
  )
})

test("duration format", () => {
  expect(episode.duration.textLabel).toBe("42:58")
  expect(episode.duration.accessibilityLabel).toBe(
    'demoPodcastListScreen.accessibility.durationLabel {"hours":0,"minutes":42,"seconds":58}',
  )
})
