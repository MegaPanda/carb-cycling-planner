import { useNavigate } from "react-router";
import styled from "styled-components/macro";
import FoodItem from "../components/foodItem";
import { cancelIcon, returnIcon, searchIcon } from "../components/icons";
import { useFood } from "../custom-hooks/useFood";
import { ChangeEvent, useLayoutEffect, useState } from "react";
import { getFocus } from "../helpers/helpers";
import { foodData } from "../foodData";
import { DiaryEntryType, FoodItemType } from "../redux/reducers/userSlice";

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



const FoodSearch = ({userDiary}: {userDiary: DiaryEntryType[]}) => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const food = useFood();
    const navigate = useNavigate();
    let foodHistory: FoodItemType[] = [];
    userDiary.forEach((entry) => {
        for (const meal of Object.values(entry.meals)) {
            meal.forEach((food) => {
                if (!foodHistory.some((element) => element.name === food.name)) {
                    foodHistory.push(food);
                }
            });
        };
    });

    const [searchInput, setSearchInput] = useState("");
    const [listTitle, setListTitle] = useState("History");

    const handleReturn = () => {
        navigate(-1);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
        setListTitle("History");
    }

    const clearInput = (id: string) => {
        setSearchInput("");
        setListTitle("History");
        getFocus(id);
    };

    const handleSearch = (id: string) => {
        setListTitle("Search Results")
        getFocus(id)
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
                        <CancelButton onClick={() => clearInput("search")}>{cancelIcon()}</CancelButton>
                    }
                </SearchBar>
                <ListTitle>{listTitle}</ListTitle>
                {!searchInput && listTitle === "History" &&
                    foodHistory.map((foodItem, index) => <FoodItem key={index} foodItem={foodItem} meal={food.meal} />)
                }
                {searchInput && listTitle === "Search Results" &&
                    foodData
                        .filter((foodItem) => foodItem.name.toLowerCase().includes(searchInput.toLowerCase()))
                        .map((foodItem, index) => {
                            return (<FoodItem key={index} foodItem={foodItem} meal={food.meal} />)
                    })
                }
                {searchInput && listTitle === "History" &&
                    <SearchButton type="button" onClick={() => handleSearch("search")}>
                        <Icon>{searchIcon()}</Icon>
                        <span>Search "{searchInput}" in all foods</span>
                    </SearchButton>
                }
            </Container>
    )
};

export default FoodSearch;