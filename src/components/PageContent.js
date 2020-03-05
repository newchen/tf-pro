import Tabs from './Tabs'
import TabsContent from './Tabs/TabsContent'

export default ({ children, ...rest }) => {
  let { settings: { layout } } = rest
  let content = children

  switch(layout) {
    case 'tf-side-top-tab':
    case 'tf-sidemenu-tab':
      content = <TabsContent { ...rest }>{ children }</TabsContent>
      break;
  }

  return content;
}
