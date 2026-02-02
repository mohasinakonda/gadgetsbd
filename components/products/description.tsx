'use client'
import MDEditor from "@uiw/react-md-editor"

export const Description = ({ description }: { description: string }) => {
  return (

    <MDEditor.Markdown
      source={description}
      style={{ whiteSpace: 'pre-wrap', background: 'white', color: 'black' }}
      components={{
        ul: ({ ...props }) => (
          <ul {...props} className="space-y-0" style={{ listStyleType: 'disc', paddingLeft: 20, }} />
        ),
        li: ({ ...props }) => (
          <li {...props} />
        ),


      }}
    />

  )
}