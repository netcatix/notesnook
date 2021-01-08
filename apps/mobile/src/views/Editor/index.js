import React, {useCallback, useEffect} from 'react';
import {Platform, TextInput} from 'react-native';
import WebView from 'react-native-webview';
import {notesnook} from '../../../e2e/test.ids';
import { useTracked } from '../../provider';
import {ToastEvent} from '../../services/EventManager';
import PremiumService from '../../services/PremiumService';
import {getCurrentColors} from '../../utils/Colors';
import EditorHeader from './EditorHeader';
import {
  EditorWebView,
  injectedJS,
  onWebViewLoad,
  sourceUri,
  textInput,
  _onMessage,
  _onShouldStartLoadWithRequest,
} from './Functions';

const source =
  Platform.OS === 'ios'
    ? {uri: sourceUri}
    : {
        uri: 'file:///android_asset/texteditor.html',
        baseUrl: 'file:///android_asset/',
      };

const style = {
  height: '100%',
  maxHeight: '100%',
  width: '100%',
  alignSelf: 'center',
  backgroundColor: 'transparent',
};

const Editor = React.memo(
  () => {
    const [state] = useTracked();
    const {premiumUser} = state;
    const onLoad = async () => {
      await onWebViewLoad(premiumUser, getCurrentColors());
    };

    return (
      <>
        <TextInput
          ref={textInput}
          style={{height: 1, padding: 0, width: 1, position: 'absolute'}}
          blurOnSubmit={false}
        />
        <EditorHeader />
        <WebView
          testID={notesnook.ids.default.editor}
          ref={EditorWebView}
          onLoad={onLoad}
          onError={(event) => {
            //EditorWebView.current?.reload();
            ToastEvent.show('Editor Load Error', 'error');
          }}
          javaScriptEnabled={true}
          focusable={true}
          keyboardDisplayRequiresUserAction={false}
          injectedJavaScript={Platform.OS === 'ios' ? injectedJS : null}
          onShouldStartLoadWithRequest={_onShouldStartLoadWithRequest}
          cacheMode="LOAD_DEFAULT"
          cacheEnabled={false}
          domStorageEnabled={true}
          scrollEnabled={false}
          bounces={false}
          allowFileAccess={true}
          scalesPageToFit={true}
          allowingReadAccessToURL={Platform.OS === 'android' ? true : null}
          allowFileAccessFromFileURLs={true}
          allowUniversalAccessFromFileURLs={true}
          originWhitelist={['*']}
          source={source}
          style={style}
          onMessage={_onMessage}
        />
      </>
    );
  },
  () => true,
);

export default Editor;
