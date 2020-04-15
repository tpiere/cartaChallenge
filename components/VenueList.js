import { Venue } from './Venue';

const listStyles = {
    listStyle: 'none',
    margin:0,
    padding:0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'stretch'
}

// const listItemStyles = {
//     width: '32%',
//     margin: '10px 0'
// }

export function VenueList({ nearbyPlaces }) {
    if (nearbyPlaces == null || nearbyPlaces.length == 0) {
        return null;
    }
    return (
        <ul style={listStyles}>
            {nearbyPlaces.map((venue) => {
                const { name, formattedAddressParts, id } = venue;
                const formattedAddress = formattedAddressParts?.join(', ')
                return (
                    <li key={id}>
                        <Venue  name={name} formattedAddress={formattedAddress} />
                        <style jsx>{`
                            li {
                                width: 100%;
                                margin: 10px 0;
                            }

                            @media screen and (min-width: 450px) {
                                li {
                                    width: 49%;
                                }
                            }

                            @media screen and (min-width: 767px) {
                                li {
                                    width: 32%;
                                }
                            }
                        `}</style>
                    </li>);
            })}
        </ul>
    );
}