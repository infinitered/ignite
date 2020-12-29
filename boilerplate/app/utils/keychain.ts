import * as ReactNativeKeychain from "react-native-keychain"

/**
 * Saves some credentials securely.
 *
 * @param username The username
 * @param password The password
 * @param server The server these creds are for.
 */
export async function save(username: string, password: string, server?: string) {
  if (server) {
    await ReactNativeKeychain.setInternetCredentials(server, username, password)
    return true
  } else {
    return ReactNativeKeychain.setGenericPassword(username, password)
  }
}

/**
 * Loads credentials that were already saved.
 *
 * @param server The server that these creds are for
 */
export async function load(server?: string) {
  if (server) {
    const creds = await ReactNativeKeychain.getInternetCredentials(server)
    return {
      username: creds ? creds.username : null,
      password: creds ? creds.password : null,
      server,
    }
  } else {
    const creds = await ReactNativeKeychain.getGenericPassword()
    if (typeof creds === "object") {
      return {
        username: creds.username,
        password: creds.password,
        server: null,
      }
    } else {
      return {
        username: null,
        password: null,
        server: null,
      }
    }
  }
}

/**
 * Resets any existing credentials for the given server.
 *
 * @param server The server which has these creds
 */
export async function reset(server?: string) {
  if (server) {
    await ReactNativeKeychain.resetInternetCredentials(server)
    return true
  } else {
    const result = await ReactNativeKeychain.resetGenericPassword()
    return result
  }
}
