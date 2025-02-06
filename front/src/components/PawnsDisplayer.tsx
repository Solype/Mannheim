import { Icons } from "@/components/ui/icons";

function IconsDemo() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 md:grid-cols-4 lg:grid-cols-6">
      {Object.entries(Icons).map(([name, Icon]) => (
        <div
          key={name}
          className="flex flex-col items-center justify-center gap-2 rounded-lg border p-4"
        >
          <Icon className="h-8 w-8" />
          <span className="text-sm text-gray-600">{name}</span>
        </div>
      ))}
    </div>
  )
}

export { IconsDemo };