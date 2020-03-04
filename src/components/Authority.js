// 权限组件
export default ({ authority, children, noMatch: NoMatch }) => {
  return (
    authority
      ? children
      : (NoMatch ? <NoMatch /> : null)
  )
}

