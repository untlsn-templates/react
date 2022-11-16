import { useParams } from '~/renderer/PageContext';

export function Page() {
  const { id } = useParams();

  return (
    <div>
      <p>ID: {id}</p>
    </div>
  );
}
