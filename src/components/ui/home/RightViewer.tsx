/* eslint-disable @typescript-eslint/no-explicit-any */
export default function RightViewer({ article }: any) {
  if (!article) {
    return (
      <div className="p-4 border rounded-xl">
        <p>Select a news to read</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-xl bg-white shadow">
      <h2 className="text-xl font-bold">{article.title}</h2>
      <p className="mt-2 text-gray-700">{article.content}</p>
    </div>
  );
}
