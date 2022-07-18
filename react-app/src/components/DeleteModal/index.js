const DeleteModal = ({ onCancel, onDelete }) => {
  return (
    <div className="delete-modal">
      <p>Are you sure you want to delete this?</p>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  )
}