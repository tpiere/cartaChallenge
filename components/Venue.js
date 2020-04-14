export function Venue({ name, formattedAddress }) {
    return (<article>
        <h1>{name}</h1>
        <p>{formattedAddress}</p>
    </article>);
}
