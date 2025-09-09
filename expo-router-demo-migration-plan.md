# Expo Router Demo App Migration Plan

## Overview

This plan outlines the conversion of the existing React Navigation demo app to an equivalent Expo Router implementation. The demo app will be created in `boilerplate/src/app/*` to mirror the same functionality and user experience as the React Navigation version.

## Current React Navigation Structure Analysis

### Navigation Architecture

1. **AppNavigator** - Main stack navigator with authentication flow:

   - `Login` screen (when not authenticated)
   - `Welcome` screen (when authenticated)
   - `Demo` tab navigator (nested)

2. **DemoNavigator** - Bottom tab navigator with 4 tabs:
   - **DemoShowroom** - Component showcase with drawer navigation
   - **DemoCommunity** - Community links and resources
   - **DemoPodcastList** - Podcast episodes with favorites functionality
   - **DemoDebug** - Debug information and theme controls

### Screen Functionality

- **LoginScreen**: Authentication form with email/password fields
- **WelcomeScreen**: Landing page with navigation to demo tabs
- **DemoShowroomScreen**: Interactive component showcase with drawer menu
- **DemoCommunityScreen**: Static links to community resources
- **DemoPodcastListScreen**: Dynamic list with API integration and favorites
- **DemoDebugScreen**: App info, theme toggle, Reactotron integration

## Expo Router Implementation Plan

### 1. Root Layout Configuration (`src/app/_layout.tsx`)

**Current Implementation**: Basic layout with providers
**New Implementation**: Enhanced layout with authentication context and demo providers

```typescript
// Enhanced _layout.tsx with:
- AuthContext provider integration
- EpisodeContext provider for podcast functionality
- Conditional navigation based on authentication state
- Error boundary integration
```

### 2. Authentication Flow

**File Structure**:

```
src/app/
├── _layout.tsx (root layout)
├── index.tsx (redirect to login/welcome based on auth)
├── login.tsx (login screen)
├── welcome.tsx (welcome screen)
└── (demo)/ (tab group for demo screens)
```

**Implementation Details**:

- `index.tsx`: Check authentication and redirect appropriately
- `login.tsx`: Login screen with form functionality
- `welcome.tsx`: Welcome screen with navigation to demo tabs
- Use `(demo)` group for tab navigation when authenticated

### 3. Demo Tab Navigation

**File Structure**:

```
src/app/(demo)/
├── _layout.tsx (tabs layout)
├── showroom/
│   ├── _layout.tsx (stack for showroom with drawer)
│   ├── index.tsx (main showroom screen)
│   └── [...components].tsx (dynamic routes for component demos)
├── community.tsx (community screen)
├── podcast.tsx (podcast list screen)
└── debug.tsx (debug screen)
```

**Tab Layout Configuration**:

```typescript
// (demo)/_layout.tsx
- Bottom tab navigator equivalent
- 4 tabs: Showroom, Community, Podcast, Debug
- Custom tab icons using Icon component
- Theme-aware styling
- EpisodeProvider wrapper for podcast functionality
```

### 4. Screen Implementations

#### A. Login Screen (`src/app/login.tsx`)

- **Functionality**: Identical to current LoginScreen.tsx
- **Features**:
  - Email/password form validation
  - Authentication context integration
  - Pre-filled demo credentials
  - Password visibility toggle
  - Error handling and validation

#### B. Welcome Screen (`src/app/welcome.tsx`)

- **Functionality**: Identical to current WelcomeScreen.tsx
- **Features**:
  - Welcome message and branding
  - Navigation to demo tabs using Expo Router
  - Logout functionality in header
  - Responsive layout with images

#### C. Showroom Screen (`src/app/(demo)/showroom/index.tsx`)

- **Functionality**: Component showcase with drawer navigation
- **Features**:
  - Drawer navigation for component selection
  - Dynamic component demos
  - Search parameters for deep linking
  - Responsive drawer behavior

#### D. Community Screen (`src/app/(demo)/community.tsx`)

- **Functionality**: Identical to current DemoCommunityScreen.tsx
- **Features**:
  - Static community resource links
  - External link handling
  - Slack, GitHub, and conference links
  - Infinite Red hiring information

#### E. Podcast Screen (`src/app/(demo)/podcast.tsx`)

- **Functionality**: Identical to current DemoPodcastListScreen.tsx
- **Features**:
  - Episode list with API integration
  - Favorites functionality
  - Pull-to-refresh
  - Empty states
  - Episode cards with animations

#### F. Debug Screen (`src/app/(demo)/debug.tsx`)

- **Functionality**: Identical to current DemoDebugScreen.tsx
- **Features**:
  - App information display
  - Theme toggle functionality
  - Reactotron integration
  - System information
  - Logout functionality

### 5. Context and State Management

#### Authentication Context

- **File**: Leverage existing `app/context/AuthContext.tsx`
- **Integration**: Wrap in root layout for global access
- **Functionality**: Login/logout state, token management

#### Episode Context

- **File**: Leverage existing `app/context/EpisodeContext.tsx`
- **Integration**: Wrap demo tabs for podcast functionality
- **Functionality**: Episode management, favorites, API calls

### 6. Navigation Patterns

#### Deep Linking

- **Showroom**: Support component-specific URLs
  - `/showroom` - main showroom
  - `/showroom?component=button` - specific component
- **Podcast**: Support episode filtering
  - `/podcast` - all episodes
  - `/podcast?favorites=true` - favorites only

#### Navigation Methods

- Replace `navigation.navigate()` with `router.push()`/`router.replace()`
- Replace `useRoute()` with `useLocalSearchParams()`
- Replace navigation props with Expo Router hooks

### 7. Component Adaptations

#### Header Integration

- Convert `useHeader` hook usage to Expo Router stack.screen options
- Implement logout functionality in headers where needed

#### Link Components

- Replace React Navigation `Link` with Expo Router `Link`
- Update deep linking parameters format

### 8. File Organization

```
boilerplate/src/app/
├── _layout.tsx                 # Root layout with providers
├── index.tsx                   # Auth redirect logic
├── login.tsx                   # Login screen
├── welcome.tsx                 # Welcome screen
├── (demo)/                     # Tab group
│   ├── _layout.tsx             # Tab layout
│   ├── showroom/               # Showroom stack
│   │   ├── _layout.tsx         # Stack layout
│   │   ├── index.tsx           # Main showroom
│   │   └── [component].tsx     # Dynamic component routes
│   ├── community.tsx           # Community screen
│   ├── podcast.tsx             # Podcast screen
│   └── debug.tsx               # Debug screen
└── +not-found.tsx              # 404 page
```

### 9. Migration Steps

#### Step 1: Setup Core Structure

1. Update `src/app/_layout.tsx` with authentication and context providers
2. Create `src/app/index.tsx` with authentication routing logic
3. Set up tab group structure in `src/app/(demo)/`

#### Step 2: Implement Authentication Screens

1. Create `src/app/login.tsx` (migrate from LoginScreen.tsx)
2. Create `src/app/welcome.tsx` (migrate from WelcomeScreen.tsx)
3. Test authentication flow

#### Step 3: Implement Demo Tabs

1. Create tab layout in `src/app/(demo)/_layout.tsx`
2. Migrate each screen:
   - Community screen (simplest)
   - Debug screen
   - Podcast screen (with context)
   - Showroom screen (most complex)

#### Step 4: Advanced Features

1. Implement drawer navigation for showroom
2. Add deep linking support
3. Test all navigation patterns
4. Optimize performance and animations

#### Step 5: Testing and Validation

1. Test authentication flow
2. Test all tab navigation
3. Test deep linking
4. Test theme switching
5. Test podcast functionality
6. Verify component showcase works

### 10. Key Differences from React Navigation

#### Advantages of Expo Router Version

- **File-based routing**: More intuitive structure
- **Better deep linking**: Built-in URL parameter handling
- **Type safety**: Automatic route typing
- **Web optimization**: Better SEO and navigation

#### Challenges to Address

- **Drawer navigation**: Need to implement custom drawer for showroom
- **Nested navigation**: Complex authentication + tabs + stack navigation
- **Parameter passing**: Different syntax for route parameters

### 11. Testing Strategy

#### Manual Testing Checklist

- [ ] Login/logout flow works correctly
- [ ] Tab navigation functions properly
- [ ] Showroom drawer opens and navigates
- [ ] Deep links work for all screens
- [ ] Theme switching persists across navigation
- [ ] Podcast favorites functionality works
- [ ] Pull-to-refresh works in podcast screen
- [ ] All external links open correctly

#### Automated Testing

- Update existing screen tests to work with Expo Router
- Add navigation flow tests
- Test deep linking scenarios

## Implementation Notes

### Dependencies

- All existing dependencies remain the same
- Expo Router is already included in the boilerplate
- No additional packages required

### Performance Considerations

- Use React.lazy() for heavy screens if needed
- Optimize image loading in showroom
- Minimize re-renders in podcast list

### Accessibility

- Maintain all existing accessibility features
- Ensure screen readers work with new navigation
- Test keyboard navigation (web)

### Internationalization

- All existing i18n functionality preserved
- Navigation labels use translation keys
- RTL support maintained

This migration plan ensures feature parity with the React Navigation demo while leveraging Expo Router's advantages for better developer experience and web compatibility.
