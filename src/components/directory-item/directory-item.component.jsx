import './directory-item.styles.scss';

const DirectoryItem = ({ category }) => {
    const { id, title, imageUrl } = category;
    return (
        <div key={id} className="category-container" style={{ backgroundImage: `url(${imageUrl})` }}>
            <div className="background-image" />
            <div className="body">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    )
}

export default DirectoryItem;