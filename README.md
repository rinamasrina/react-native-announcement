# react-native-announcement

A simple component to show what's new in your app.
The package is both **Android** and **iOS** compatible.
<p><img src="https://github.com/rinamasrina/react-native-announcement/blob/main/src/assets/announcement-ios.gif" width="264" height="512"/></p>

## Installation

```sh
npm install react-native-announcement
```
or
```sh
yarn add react-native-announcement
```

## Try it out
You can run example module by performing these steps:

```sh
$ git clone git@github.com:rinamasrina/react-native-announcement.git
$ cd react-native-announcement
$ yarn
$ cd example
$ yarn ios
```

## Available props
There are 3 mandatory props to be implemented.
- `visible`
- `handleDoneButtonOnPressed`
- `features`

Others are optional.

| Props        | type           | Description  |
| ------------- |-------------| ----- |
| **`visible`** | boolean | a boolean to show or hide the modal screen |
| **`handleDoneButtonOnPressed`** | void      |   a function to perform after user click `Done` or a button at the last screen |
| **`features`** | array of [Feature](https://github.com/rinamasrina/react-native-announcement/blob/main/src/types/Feature.ts)     |    list of features that you want to show. It includes image, title, and description |
| **`titleStyle`** | TextStyle | text style for title |
| **`descriptionStyle`** | TextStyle | text style for title |
| **`buttonStyle`**  | ViewStyle | style for button at the bottom |
| **`continueButtonTitle`** | string      |   title for the first to n-1 in the screen. Default is `Next` |
| **`lastIndexButtonTitle`** | string      |    title for the last button in the screen. Default is `Start` |

## Usage
1. create your `Feature` array object.
```js
const FEATURES: Feature[] = [
  {
    image: require('./assets/laptop.png'),
    title: 'Stay organized',
    description: 'Get an overview of how you are performing and motivate yourself to achieve even more',
  },
  {
    image: require('./assets/travel.png'),
    title: 'Personalise your journey',
    description: 'Create unique emotional story that describes your work better than words',
  },
];
```
2. Use `Announcement` component and add the compulsory props
```js
import Announcement from "react-native-announcement";

// ...
export default function App() {
  reutrn (
     <Announcement
        visible={true}
        handleDoneButtonOnPressed={handleDoneButtonOnPressed}
        features={FEATURES}
    />
    // ...
  )
}
```
To understand more, see the [example](https://github.com/rinamasrina/react-native-announcement/blob/main/example/src/App.tsx)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
