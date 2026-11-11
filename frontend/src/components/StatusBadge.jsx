const styles = {
  pending:   'bg-yellow-100 text-yellow-800',
  approved:  'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  rejected:  'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-700',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium capitalize ${styles[status] || styles.cancelled}`}>
      {status}
    </span>
  );
}
