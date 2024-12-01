import styled from 'styled-components/native';
// import { DrawerItems } from 'react-navigation';
import { DrawerItems } from 'react-navigation-drawer';
import { Platform } from 'react-native';
import { colors, metrics, images } from '~/assets';
import responsiveText from '~/helpers/responsiveText';

const maxWidth = metrics.screenWidth * 0.7;
const maxHeight = metrics.screenHeight * 0.2;
const aspectRatio = maxHeight > maxWidth ? maxWidth / maxHeight : maxHeight / maxWidth;

export const ContainerSafe = styled.SafeAreaView.attrs({
  forceInset: {
    top: 'always',
    horizontal: 'never',
  },
})`
  flex: 1;
  justify-content: space-between;
  background-color: ${colors.white};
`;

export const TopBar = styled.StatusBar.attrs({
  backgroundColor: Platform.select({ android: colors.primary }),
  barStyle: Platform.select({ ios: 'dark-content' }),
})``;

export const TopArea = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.grey2};
  height: ${maxHeight}px;
  background-color: ${colors.white};
  align-items: center;
  justify-content: center;
`;

export const TopLogo = styled.Image.attrs({
  source: images.embrapa_logo,
  resizeMode: 'contain',
})`
  height: ${
  maxHeight < maxWidth ? maxHeight * aspectRatio * 0.7 : maxHeight * 0.7
}px;
  /* width: ${
  maxWidth < maxHeight ? maxWidth * aspectRatio * 0.6 : maxWidth * 0.6
}px; */
  margin: ${metrics.baseMargin}px;
`;

export const Title = styled.Text`
  font-size: ${responsiveText(18)}px;
  font-weight: bold;
  color: ${colors.secondary};
  margin-top: ${metrics.baseMargin / 2}px;
`;

export const DrawerArea = styled.View`
  flex: 1;
  background-color: ${colors.grey5};
`;

export const LinkArea = styled(DrawerItems)
  .attrs({
    activeTintColor: colors.primary2,
    inactiveTintColor: colors.secondary,
    activeBackgroundColor: colors.greyOutline,
    inactiveBackgroundColor: colors.grey5,
    labelStyle: {
      fontSize: responsiveText(18),
    },
    itemsContainerStyle: {
      marginVertical: 0,
    },
    iconContainerStyle: {
      width: 34,
      heigth: 34,
    },
  })``;

export const BottomArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${colors.grey2};
  background-color: ${colors.white};
`;

export const BottomTextDescription = styled.Text`
  font-size: ${responsiveText(14)}px;
  margin-top: ${metrics.baseMargin / 2}px;
  margin-bottom: ${metrics.baseMargin / 2}px;
  margin-left: ${metrics.baseMargin}px;
  color: ${colors.primary1};
`;

export const BottomTextVersion = styled.Text`
  font-size: ${responsiveText(14)}px;
  margin-top: ${metrics.baseMargin / 2}px;
  margin-bottom: ${metrics.baseMargin / 2}px;
  margin-right: ${metrics.baseMargin}px;
  color: ${colors.primary2};
`;
