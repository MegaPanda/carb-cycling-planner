import { useNavigate } from "react-router";
import styled from "styled-components/macro";
import FoodItem from "../components/foodItem";
import { cancelIcon, returnIcon, searchIcon } from "../components/icons";
import { useFood } from "../custom-hooks/useFood";
import { ChangeEvent, useEffect, useLayoutEffect, useState } from "react";
import { getFocus } from "../helpers/helpers";
import { foodData } from "../foodData";
import { DiaryEntry, Food } from "../redux/reducers/userSlice";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { firestoreDB } from "../firebase/firebase";

const Container = styled.div`
    padding: 2rem;
`;

const Nav = styled.div`
    display: flex;
    font-size: 24px;
    
    button {
        font-size: inherit;
    }

    p {
        flex: 1;
        margin: auto;
        padding-left: 2rem;
        font-weight: 900;
    }
`;

const SearchBar = styled.div`
    margin: 1rem 0;
    display: flex;
    border: 1px solid ${props => props.theme.colors.hoverGray};
`;

const Icon = styled.div`
    display: flex;
    width: 40px;
`;

const Input = styled.input`
    border: none;
    padding: 1rem 0;
    flex: 1;
    font-size: 16px;

    :focus {
        outline: none;
    }
`;

const CancelButton = styled.button`
    display: flex;
    width: 40px;
`;

const ListTitle = styled.p`
    margin: 0;
    padding: 1rem 0;
    font-size: 20px;
    font-weight: 600;
`;

const SearchButton = styled.button`
    display: flex;
    width: 100%;
    padding: 20px 0;
    color: ${props => props.theme.colors.buttonGreen};
    font-weight: 700;
`;



const FoodSearch = ({ diary }: { diary: DiaryEntry[] }) => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const food = useFood();
    const navigate = useNavigate();
    let foodHistory: Food[] = [];
    diary.forEach((entry) => {
        if (!foodHistory.some((item) => item.name === entry.food.name)) {
            foodHistory.push(entry.food);
        }
    });

    const [searchInput, setSearchInput] = useState("");
    const [listTitle, setListTitle] = useState("History");
    const [searchResult, setSearchResult] = useState<Food[]>([]);

    const handleReturn = () => {
        navigate(-1);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
        setListTitle("History");
    }

    const clearInput = () => {
        setSearchInput("");
        setListTitle("History");
        getFocus("search");
    };

    const handleSearch = async (text: string) => {
        let searchResult: Food[] = [];
        const searchQuery = query(collection(firestoreDB, "foods"), where("keywords", "array-contains", text));
        const searchSnapshot = await getDocs(searchQuery);
        searchSnapshot.forEach((foodDoc) => {
            let food = foodDoc.data() as Food;
            delete food.keywords;
            searchResult.push(food);
        });
        setSearchResult([...searchResult]);
        setListTitle("Search Results");
        getFocus("search");
    };

    return (
            <Container>
                <Nav>
                    <button onClick={() => handleReturn()}>{returnIcon()}</button>
                    <p>{food.meal.toUpperCase()}</p>
                </Nav>
                <SearchBar>
                    <Icon>{searchIcon()}</Icon>
                    <Input id="search" type="text" placeholder="Search food" value={searchInput} onChange={(event) => handleChange(event)}></Input>
                    {searchInput &&
                        <CancelButton onClick={() => clearInput()}>{cancelIcon()}</CancelButton>
                    }
                </SearchBar>
                <ListTitle>{listTitle}</ListTitle>
                {!searchInput && listTitle === "History" &&
                    foodHistory.map((foodItem, index) => <FoodItem key={index} foodItem={foodItem} meal={food.meal} />)
                }
                {listTitle === "Search Results" && searchResult.length > 0 &&
                    searchResult.map((foodItem, index) => <FoodItem key={index} foodItem={foodItem} meal={food.meal} />)
                }
                {searchInput && listTitle === "History" &&
                    <SearchButton type="button" onClick={() => handleSearch(searchInput)}>
                        <Icon>{searchIcon()}</Icon>
                        <span>Search "{searchInput}" in all foods</span>
                    </SearchButton>
                }
            </Container>
    )
};

export default FoodSearch;