import { useParams } from '~/renderer/PageContext';
import useDocumentTitle from '~/hooks/useDocumentTitle';

export function Page() {
  const { id } = useParams();
  useDocumentTitle(`ID: ${id}`);

  return (
    <div>
      <p>ID: {id}</p>
    </div>
  );
}
