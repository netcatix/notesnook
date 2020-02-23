import React, {useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import {
  opacity,
  pv,
  SIZE,
  WEIGHT,
  ACCENT,
  COLOR_SCHEME,
  COLOR_SCHEME_DARK,
  COLOR_SCHEME_LIGHT,
  setColorScheme,
} from '../../common/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Container from '../../components/Container';
import {useTracked} from '../../provider';
import {w, hexToRGBA} from '../../utils/utils';
import {ACTIONS} from '../../provider/actions';
import FastStorage from 'react-native-fast-storage';
import {DDS} from '../../../App';
import {updateEvent} from '../../components/DialogManager';

export async function setSetting(settings, name, value) {
  let s = {...settings};
  s[name] = value;
  await FastStorage.setItem('settings', JSON.stringify(s));

  updateEvent({type: ACTIONS.SETTINGS, settings: s});
}

export const Settings = ({navigation}) => {
  const [state, dispatch] = useTracked();
  const {colors, user, settings} = state;

  function changeColorScheme(colors = COLOR_SCHEME, accent = ACCENT) {
    let newColors = setColorScheme(colors, accent);
    StatusBar.setBarStyle(colors.night ? 'light-content' : 'dark-content');

    dispatch({type: ACTIONS.THEME, colors: newColors});
  }

  function changeAccentColor(accentColor) {
    ACCENT.color = accentColor;
    ACCENT.shade = accentColor + '12';
    changeColorScheme();
  }
  console.log(settings);
  return (
    <Container
      menu={true}
      heading="Settings"
      canGoBack={false}
      noSearch={true}
      noSelectionHeader={true}
      noBottomButton={true}>
      <View
        style={{
          marginTop: Platform.OS == 'ios' ? 135 - 60 : 155 - 60,
        }}
      />

      <ScrollView
        style={{
          paddingHorizontal: 12,
        }}>
        <Text
          style={{
            fontSize: SIZE.xs,
            fontFamily: WEIGHT.bold,
            textAlignVertical: 'center',
            color: colors.accent,

            borderBottomColor: colors.nav,
            borderBottomWidth: 0.5,
            paddingBottom: 3,
          }}>
          Appearance
        </Text>

        <Text
          style={{
            fontSize: SIZE.sm,
            fontFamily: WEIGHT.regular,
            textAlignVertical: 'center',
            color: colors.pri,
            marginTop: pv + 5,
          }}>
          Accent Color
        </Text>

        <View
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
          style={{
            backgroundColor: Platform.ios
              ? hexToRGBA(colors.accent + '19')
              : hexToRGBA(colors.shade),
            borderRadius: 5,
            padding: 5,
            marginTop: 10,
            marginBottom: pv + 5,
            width: '100%',
            alignSelf: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {[
            '#e6194b',
            '#3cb44b',
            '#ffe119',
            '#0560FF',
            '#f58231',
            '#911eb4',
            '#46f0f0',
            '#f032e6',
            '#bcf60c',
            '#fabebe',
          ].map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                changeAccentColor(item);

                FastStorage.setItem('accentColor', item);
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
                marginVertical: 5,
              }}>
              <View
                style={{
                  width: 35,
                  height: 35,
                  backgroundColor: item,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {colors.accent === item ? (
                  <Icon size={SIZE.lg} color="white" name="check" />
                ) : null}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => {
            if (!colors.night) {
              FastStorage.setItem('theme', JSON.stringify({night: true}));
              changeColorScheme(COLOR_SCHEME_DARK);
            } else {
              FastStorage.setItem('theme', JSON.stringify({night: false}));

              changeColorScheme(COLOR_SCHEME_LIGHT);
            }
          }}
          activeOpacity={opacity}
          style={{
            width: '100%',
            marginHorizontal: 0,
            paddingVertical: pv + 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: SIZE.sm,
              fontFamily: WEIGHT.regular,
              textAlignVertical: 'center',
              color: colors.pri,
            }}>
            Dark mode
          </Text>
          <Icon
            size={SIZE.xl}
            color={colors.night ? colors.accent : colors.icon}
            name={colors.night ? 'toggle-switch' : 'toggle-switch-off'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            let scale = settings.fontScale;

            scale === 1
              ? (scale = 1.1)
              : scale === 1.1
              ? (scale = 1.2)
              : scale === 1.2
              ? (scale = 1.3)
              : scale === 1.3
              ? (scale = 1.4)
              : scale === 1.4
              ? (scale = 1.5)
              : scale === 1.5
              ? (scale = 1)
              : (scale = 1);

            await setSetting(settings, 'fontScale', scale);
          }}
          activeOpacity={opacity}
          style={{
            width: '100%',
            marginHorizontal: 0,
            paddingVertical: pv + 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: colors.nav,
          }}>
          <Text
            style={{
              fontSize: SIZE.sm,
              fontFamily: WEIGHT.regular,
              textAlignVertical: 'center',
              color: colors.pri,
            }}>
            Font Scaling
          </Text>

          <View
            style={{
              borderBottomWidth: 1,
              borderColor: colors.nav,
              paddingVertical: 1,
              paddingHorizontal: 5,
            }}>
            <Text
              style={{
                fontSize: SIZE.xs,
                fontFamily: WEIGHT.regular,
                textAlignVertical: 'center',
                color: colors.pri,
              }}>
              {settings.fontScale + 'X'}
            </Text>
          </View>
        </TouchableOpacity>

        {DDS.isTab ? (
          <TouchableOpacity
            onPress={async () => {
              await setSetting(
                settings,
                'forcePortraitOnTablet',
                !settings.forcePortraitOnTablet,
              );
            }}
            activeOpacity={opacity}
            style={{
              width: '100%',
              marginHorizontal: 0,
              paddingVertical: pv + 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: SIZE.sm,
                fontFamily: WEIGHT.regular,
                textAlignVertical: 'center',
                color: colors.pri,
              }}>
              Force portrait mode
            </Text>
            <Icon
              size={SIZE.xl}
              color={
                settings.forcePortraitOnTablet ? colors.accent : colors.icon
              }
              name={
                settings.forcePortraitOnTablet
                  ? 'toggle-switch'
                  : 'toggle-switch-off'
              }
            />
          </TouchableOpacity>
        ) : null}

        <Text
          style={{
            fontSize: SIZE.xs,
            fontFamily: WEIGHT.bold,
            textAlignVertical: 'center',
            color: colors.accent,

            borderBottomColor: colors.nav,
            borderBottomWidth: 0.5,
            paddingBottom: 3,
          }}>
          Editor Settings
        </Text>

        <TouchableOpacity
          activeOpacity={opacity}
          onPress={async () => {
            await setSetting(
              settings,
              'showToolbarOnTop',
              !settings.showToolbarOnTop,
            );
          }}
          style={{
            width: '100%',
            marginHorizontal: 0,
            flexDirection: 'row',
            marginTop: pv + 5,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: pv + 5,
          }}>
          <Text
            style={{
              fontSize: SIZE.sm,
              fontFamily: WEIGHT.regular,
              textAlignVertical: 'center',
              color: colors.pri,
            }}>
            Show toolbar on top
          </Text>
          <Icon
            size={SIZE.xl}
            color={settings.showToolbarOnTop ? colors.accent : colors.icon}
            name={
              settings.showToolbarOnTop ? 'toggle-switch' : 'toggle-switch-off'
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={opacity}
          onPress={async () => {
            await setSetting(
              settings,
              'showKeyboardOnOpen',
              !settings.showKeyboardOnOpen,
            );
          }}
          style={{
            width: '100%',
            marginHorizontal: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

            paddingVertical: pv + 5,
          }}>
          <Text
            style={{
              fontSize: SIZE.sm,
              fontFamily: WEIGHT.regular,
              textAlignVertical: 'center',
              color: colors.pri,
            }}>
            Show keyboard on open
          </Text>
          <Icon
            size={SIZE.xl}
            color={settings.showKeyboardOnOpen ? colors.accent : colors.icon}
            name={
              settings.showKeyboardOnOpen
                ? 'toggle-switch'
                : 'toggle-switch-off'
            }
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: SIZE.xs,
            fontFamily: WEIGHT.bold,
            textAlignVertical: 'center',
            color: colors.accent,

            borderBottomColor: colors.nav,
            borderBottomWidth: 0.5,
            paddingBottom: 3,
          }}>
          Account Settings
        </Text>

        {user ? (
          <>
            <Text
              style={{
                fontSize: SIZE.sm,
                fontFamily: WEIGHT.regular,
                textAlignVertical: 'center',
                color: colors.pri,
                marginTop: pv + 5,
              }}>
              Logged in as:
            </Text>

            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                alignSelf: 'center',
                flexDirection: 'row',
                width: '100%',
                paddingVertical: pv,
                marginBottom: pv + 5,
                marginTop: pv,
                backgroundColor: colors.accent,
                borderRadius: 5,
                padding: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon size={SIZE.lg} color="white" name="account-outline" />
                <Text
                  style={{
                    color: 'white',
                    marginLeft: 5,
                    fontFamily: WEIGHT.regular,
                    fontSize: SIZE.sm,
                  }}>
                  {user.username}
                </Text>
              </View>
              <View
                style={{
                  borderRadius: 5,
                  padding: 5,
                  paddingVertical: 2.5,
                  backgroundColor: 'white',
                }}>
                <Text
                  style={{
                    color: colors.accent,
                    fontFamily: WEIGHT.regular,
                    fontSize: SIZE.xs,
                  }}>
                  Pro
                </Text>
              </View>
            </View>

            {[
              {
                name: 'Backup my notes',
              },

              {
                name: 'My vault',
              },
              {
                name: 'Subscription status',
              },
              {
                name: 'Change password',
              },
              {
                name: 'Logout',
              },
            ].map(item => (
              <TouchableOpacity
                key={item.name}
                activeOpacity={opacity}
                style={{
                  width: '100%',

                  paddingVertical: pv + 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: SIZE.sm,
                    fontFamily: WEIGHT.regular,
                    textAlignVertical: 'center',
                    color: colors.pri,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        ) : null}

        <Text
          style={{
            fontSize: SIZE.xs,
            fontFamily: WEIGHT.bold,
            textAlignVertical: 'center',
            color: colors.accent,

            borderBottomColor: colors.nav,
            borderBottomWidth: 0.5,
            paddingBottom: 3,
            marginBottom: pv + 5,
          }}>
          Other
        </Text>

        {[
          {
            name: 'Terms of Service',
            func: () => {},
          },
          {
            name: 'Privacy Policy',
            func: () => {},
          },
          {
            name: 'About',
            func: () => {},
          },
        ].map(item => (
          <TouchableOpacity
            key={item.name}
            activeOpacity={opacity}
            onPress={item.func}
            style={{
              width: item.step ? '85%' : w - 24,
              paddingVertical: pv + 5,
            }}>
            <Text
              style={{
                fontSize: SIZE.sm,
                fontFamily: WEIGHT.regular,
                textAlignVertical: 'center',
                color: colors.pri,
              }}>
              {item.name}
            </Text>
            {item.customComponent ? item.customComponent : null}
          </TouchableOpacity>
        ))}
        <View
          style={{
            height: 300,
          }}
        />
      </ScrollView>
    </Container>
  );
};

Settings.navigationOptions = {
  header: null,
};

export default Settings;
