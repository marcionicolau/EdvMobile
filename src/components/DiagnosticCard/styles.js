import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/assets';
import responsiveText from '~/helpers/responsiveText';

export default StyleSheet.create({
  listItem: {
    flex: 1,
    backgroundColor: colors.grey4,
    marginTop: metrics.baseMargin / 2,
    borderRadius: metrics.baseRadius,
  },

  listImage: {
    height: 230,
    width: null,
    justifyContent: 'space-between',

    paddingTop: metrics.basePadding,
  },

  listInnerImage: {
    borderRadius: metrics.baseRadius,
  },

  diagnosticContainer: {
    backgroundColor: colors.whiteTransparent,
    borderRadius: metrics.baseRadius,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: metrics.screenWidth - metrics.baseMargin * 2,
    padding: metrics.basePadding,
  },

  diagnosticLabel: {
    fontSize: responsiveText(18),
    fontWeight: 'bold',
    color: colors.primary2,
  },

  listFooter: {
    flexDirection: 'row',
    borderTopColor: colors.grey2,
    borderTopWidth: StyleSheet.hairlineWidth,

    paddingHorizontal: metrics.basePadding,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.darkTransparent,
    borderBottomLeftRadius: metrics.baseRadius,
    borderBottomRightRadius: metrics.baseRadius,
  },

  informationContainer: {
    flexDirection: 'row',
  },

  baseIcon: {
    marginHorizontal: metrics.baseMargin / 2,
    color: colors.white,
  },

  informationTitle: {
    marginHorizontal: metrics.baseMargin / 2,
    color: colors.white,
  },

  informationValue: {
    marginHorizontal: metrics.baseMargin / 2,
    color: colors.white,
    fontWeight: 'bold',
  },

  geoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  geoPosition: {
    marginHorizontal: metrics.baseMargin / 2,
    color: colors.white,
    fontWeight: 'bold',
  },
});
