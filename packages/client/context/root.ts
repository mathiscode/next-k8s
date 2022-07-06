import { createContext } from 'react'

interface RootContext {
  user?: Object;
  setContext: Function;
}

const RootContext = createContext<RootContext>({
  setContext: () => {}
})

export default RootContext
