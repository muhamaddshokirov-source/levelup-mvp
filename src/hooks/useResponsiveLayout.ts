import { useWindowDimensions, ViewStyle } from 'react-native';

/** Stack content panes on phones; never keep a desktop flex basis on a narrow screen. */
export function useResponsiveLayout() {
  const compact = useWindowDimensions().width < 860;
  const columns: ViewStyle = compact ? { flexDirection: 'column', alignItems: 'stretch' } : {};
  const pane: ViewStyle = compact
    ? { flexBasis: 'auto', flexGrow: 0, flexShrink: 1, width: '100%', minWidth: 0, maxWidth: '100%' }
    : { flexShrink: 1, minWidth: 0, maxWidth: '100%' };
  return { compact, columns, pane };
}
