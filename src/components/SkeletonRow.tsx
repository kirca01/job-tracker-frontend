export default function SkeletonRow() {
    return (
        <tr className="border-b border-gray-800 animate-pulse">
            <td className="px-6 py-4">
                <div className="h-4 bg-gray-800 rounded w-32" />
            </td>
            <td className="px-6 py-4">
                <div className="h-4 bg-gray-800 rounded w-48" />
            </td>
            <td className="px-6 py-4">
                <div className="h-6 bg-gray-800 rounded-full w-20" />
            </td>
            <td className="px-6 py-4">
                <div className="h-4 bg-gray-800 rounded w-24" />
            </td>
            <td className="px-6 py-4">
                <div className="h-4 bg-gray-800 rounded w-20" />
            </td>
        </tr>
    )
}