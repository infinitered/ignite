import demoEs from "./demo-es" // @demo remove-current-line
import { Translations } from "./en"

const es: Translations = {
    common: {
      ok: "OK",
      cancel: "Cancelar",
      back: "Volver",
      logOut: "Cerrar sesión", // @demo remove-current-line
    },
    welcomeScreen: {
      postscript:
        "psst — Esto probablemente no es cómo se va a ver tu app. (A menos que tu diseñador te haya enviado estas pantallas, y en ese caso, ¡lánzalas en producción!)",
      readyForLaunch: "Tu app, casi lista para su lanzamiento",
      exciting: "(¡ohh, esto es emocionante!)",
      letsGo: "¡Vamos!", // @demo remove-current-line
    },
    errorScreen: {
      title: "¡Algo salió mal!",
      friendlySubtitle:
        "Esta es la pantalla que verán tus usuarios en producción cuando haya un error. Vas a querer personalizar este mensaje (que está ubicado en `app/i18n/es.ts`) y probablemente también su diseño (`app/screens/ErrorScreen`). Si quieres eliminarlo completamente, revisa `app/app.tsx` y el componente <ErrorBoundary>.",
      reset: "REINICIA LA APP",
      traceTitle: "Error desde %{name}", // @demo remove-current-line
    },
    emptyStateComponent: {
      generic: {
        heading: "Muy vacío... muy triste",
        content:
          "No se han encontrado datos por el momento. Intenta darle clic en el botón para refrescar o recargar la app.",
        button: "Intentemos de nuevo",
      },
    },
    // @demo remove-block-start
    errors: {
      invalidEmail: "Email inválido.",
    },
    loginScreen: {
      logIn: "Iniciar sesión",
      enterDetails:
        "Ingresa tus datos a continuación para desbloquear información ultra secreta. Nunca vas a adivinar lo que te espera al otro lado. O quizás si lo harás; la verdad no hay mucha ciencia alrededor.",
      emailFieldLabel: "Email",
      passwordFieldLabel: "Contraseña",
      emailFieldPlaceholder: "Ingresa tu email",
      passwordFieldPlaceholder: "Contraseña super secreta aquí",
      tapToLogIn: "¡Presiona acá para iniciar sesión!",
      hint: "Consejo: puedes usar cualquier email y tu contraseña preferida :)",
    },
    demoNavigator: {
      componentsTab: "Componentes",
      debugTab: "Debug",
      communityTab: "Comunidad",
      podcastListTab: "Podcasts",
    },
    demoCommunityScreen: {
      title: "Conecta con la comunidad",
      tagLine:
        "Únete a la comunidad de ingenieros de React Native de Infinite Red y mejora tu desarrollo de aplicaciones con nosotros.",
      joinUsOnSlackTitle: "Únete a nosotros en Slack",
      joinUsOnSlack:
        "¿Quieres conectarte con ingenieros de React Native de todo el mundo? Únete a la conversación en la comunidad de Slack de Infinite Red. Nuestra comunidad en crecimiento es un espacio seguro para hacer preguntas, aprender de los demás y ampliar tu red.",
      joinSlackLink: "Únete a la comunidad de Slack",
      makeIgniteEvenBetterTitle: "Haz que Ignite sea aún mejor",
      makeIgniteEvenBetter:
        "¿Tienes una idea para hacer que Ignite sea aún mejor? ¡Nos encantaría escucharla! Siempre buscamos personas que quieran ayudarnos a construir las mejores herramientas para React Native. Únete a nosotros en GitHub para ayudarnos a construir el futuro de Ignite.",
      contributeToIgniteLink: "Contribuir a Ignite",
      theLatestInReactNativeTitle: "Lo último en React Native",
      theLatestInReactNative:
        "Estamos aquí para mantenerte al día con todo lo que React Native tiene para ofrecer.",
      reactNativeRadioLink: "Radio React Native",
      reactNativeNewsletterLink: "Boletín de React Native",
      reactNativeLiveLink: "React Native Live",
      chainReactConferenceLink: "Conferencia Chain React",
      hireUsTitle: "Contrata a Infinite Red para tu próximo proyecto",
      hireUs:
        "Ya sea para gestionar un proyecto completo o para formar equipos a través de nuestra capacitación práctica, Infinite Red puede ayudarte con casi cualquier proyecto de React Native.",
      hireUsLink: "Envíanos un mensaje",
    },
    demoShowroomScreen: {
      jumpStart: "Componentes para comenzar tu proyecto",
      lorem2Sentences:
        "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
      demoHeaderTxExample: "Yay",
      demoViaTxProp: "A través de la propiedad `tx`",
      demoViaSpecifiedTxProp: "A través de la propiedad especificada `{{prop}}Tx`",
    },
    demoDebugScreen: {
      howTo: "CÓMO HACERLO",
      title: "Depuración",
      tagLine:
        "Felicidades, tienes un modelo de app de React Native muy avanzado aquí. ¡Disfruta de esta base de código!",
      reactotron: "Enviar a Reactotron",
      reportBugs: "Reportar errores",
      demoList: "Lista de demostración",
      demoPodcastList: "Lista de podcasts de demostración",
      androidReactotronHint:
        "Si esto no funciona, asegúrate de que la app de escritorio de Reactotron esté funcionando, ejecuta adb reverse tcp:9090 tcp:9090 desde tu terminal, y luego recarga la app.",
      iosReactotronHint:
        "Si esto no funciona, asegúrate de que la app de escritorio de Reactotron esté funcionando, y luego recarga la app.",
      macosReactotronHint:
        "Si esto no funciona, asegúrate de que la app de escritorio de Reactotron esté funcionando, y luego recarga la app.",
      webReactotronHint:
        "Si esto no funciona, asegúrate de que la app de escritorio de Reactotron esté funcionando, y luego recarga la app.",
      windowsReactotronHint:
        "Si esto no funciona, asegúrate de que la app de escritorio de Reactotron esté funcionando, y luego recarga la app.",
    },
    demoPodcastListScreen: {
      title: "Episodios de Radio React Native",
      onlyFavorites: "Mostrar solo favoritos",
      favoriteButton: "Favorito",
      unfavoriteButton: "No favorito",
      accessibility: {
        cardHint:
          "Haz doble clic para escuchar el episodio. Haz doble clic y mantén para {{action}} este episodio.",
        switch: "Activa para mostrar solo favoritos",
        favoriteAction: "Alternar a favorito",
        favoriteIcon: "Episodio no favorito",
        unfavoriteIcon: "Episodio favorito",
        publishLabel: "Publicado el {{date}}",
        durationLabel: "Duración: {{hours}} horas {{minutes}} minutos {{seconds}} segundos",
      },
      noFavoritesEmptyState: {
        heading: "Está un poco vacío aquí",
        content:
          "No se han agregado favoritos todavía. ¡Presiona el corazón en un episodio para agregarlo a tus favoritos!",
      },
    },
    // @demo remove-block-start
    ...demoEs,
    // @demo remove-block-end
  }

export default es
