export interface ComponentDoc {
  id: string
  name: string
  description: string
  category: string
  features: string[]
  props: PropDoc[]
  examples: ExampleDoc[]
  imports: string
}

export interface ColorDoc {
  id: string
  name: string
  description: string
  category: string
}

export interface IconDoc {
  id: string
  name: string
  description: string
  category: string
  subPages?: IconSubPage[]
}

export interface IconSubPage {
  id: string
  name: string
  description: string
  content: React.ComponentType<any>
}

export interface PropDoc {
  name: string
  type: string
  required: boolean
  default?: string
  description: string
}

export interface ExampleDoc {
  title: string
  description: string
  code: string
  preview: React.ComponentType
}