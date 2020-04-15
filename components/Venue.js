
const articleStyles= {
    border: '1px solid #eee',
    borderRadius: 5,
    padding: 10,
    height: '100%',
    boxSizing: 'border-box'

}

const headingStyles = {
    fontSize: '1rem'
}

export function Venue({ name, formattedAddress }) {
    return (
    <article style={articleStyles}>
        <h1 style={headingStyles}>{name}</h1>
        <p>{formattedAddress}</p>
    </article>
    );
}
