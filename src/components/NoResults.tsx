import {styled} from "linaria/react";

const Container = styled.div`
    text-align: center;
    padding: 0 8px 24px 8px;
`;

export default function NoResults() {
    return (
        <Container>
            <h2>No Results</h2>
            <p>
                We couldn't find any consoles that matched your search.
                Please check your filter value and make sure that you selected the correct
                type of console.
            </p>
        </Container>
    )
}
