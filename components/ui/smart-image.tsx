// components/ui/smart-image.tsx
import Image, { ImageProps } from 'next/image'

type Props = ImageProps & {
  index?: number // hint from parent grid (0-based)
}

export default function SmartImage({ index, sizes, priority, ...rest }: Props) {
  const pri = typeof priority === 'boolean' ? priority : (typeof index === 'number' && index < 2)
  const sz =
    sizes ||
    "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"

  return <Image {...rest} sizes={sz} priority={pri} />
}
