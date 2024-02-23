import Image from "next/image"
import { FC } from "react"
import { Button } from "rtu-components"
import { Icon } from "../Icons"

interface PreviewProps {
  files: File[]
  removeFile: (id: string) => void
}

export const CoverPreview: FC<PreviewProps> = ({ files, removeFile }) => {
  if (!files.length) {
    return null
  }

  const previews = files.map((file) => ({
    id: file.name,
    url: URL.createObjectURL(file),
  }))

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation()

    removeFile(id)
  }

  return (
    <div className="flex h-full w-full rounded-lg">
      {previews.map(({ id, url }) => (
        <div key={id} className="relative h-full w-full rounded-lg">
          <Image src={url} alt="preview" className="h-full w-full rounded-lg" fill />
          <Button
            onClick={(e) => handleRemove(e, id)}
            intent="custom"
            size="small"
            className="absolute right-1 top-1 rounded-lg border border-gray-300 bg-white p-3 text-gray-300"
          >
            <Icon name="X" className="text-gray" />
          </Button>
        </div>
      ))}
    </div>
  )
}
