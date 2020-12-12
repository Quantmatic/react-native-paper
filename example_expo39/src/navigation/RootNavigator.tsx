import * as React from 'react';
import { Appbar, useTheme} from 'react-native-paper';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import ExampleList, { examples } from '../ExampleList';

const Stack = createStackNavigator();

export default function Root(props) {
  const { colors } = useTheme();
  //console.log(props.navigation);
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ navigation, scene, previous }) => (
          <Appbar.Header style={[{backgroundColor: colors.background, shadowColor: "transparent"}]}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title={scene.descriptor.options.title} />
            <Appbar.Action
                icon="menu"
                onPress={() =>
                  ((navigation as any) as DrawerNavigationProp<{}>).openDrawer()
                }
              />
          </Appbar.Header>
        ),
      }}
    >
      <Stack.Screen
        name="Examples"
        component={ExampleList}
        options={{
          title: "Examples",
          headerStyle: {
            backgroundColor: colors.background,
            shadowColor: "transparent",
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      {(Object.keys(examples) as Array<keyof typeof examples>).map((id) => (
        <Stack.Screen
          key={id}
          name={id}
          component={examples[id]}
          options={{ title: examples[id].title }}
        />
      ))}
    </Stack.Navigator>
  );
}