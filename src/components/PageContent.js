import Tabs from './Tabs'
import TabsContent from './Tabs/TabsContent'

export default ({ children, ...rest }) => {
  let { settings: { fixedHeader, layout } } = rest
  let content = children

  switch(layout) {
    case 'tf-side-top-tab':
      content = (
        <Tabs
          { ...rest }
          className={fixedHeader ? 'tf-layout-fixed-header' : ''}
        >
          { children }
        </Tabs>
      )
      break;
    case 'tf-sidemenu-tab':
      content = <TabsContent { ...rest }>{ children }</TabsContent>
      break;
  }

  return content;
}
