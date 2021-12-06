import { parse } from "date-fns";
import { useLayoutEffect } from "react";
import { Navigate } from "react-router";
import styled from "styled-components";
import DailyReview from "../components/dailyReview";
import { UserState } from "../redux/reducers/userSlice";

const Container = styled.div`
    padding: 2rem 1rem 8rem 1rem;
`;

const Title = styled.h1`
    margin: 0;
    padding-left: 1rem;
`;

const Dashboard = ({ user }: { user: UserState }) => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    let diaryDates: string[] = [];
    user.diary.forEach((entry) => {
        if (!diaryDates.some((date) => date === entry.date)) {
            diaryDates.push(entry.date);
        }
    });
    const sortedDates = diaryDates.sort((a, b) => parse(b, "dd/MMM/yyyy", new Date()).getTime() - parse(a, "dd/MMM/yyyy", new Date()).getTime())

    if (user.username) {
        return (
            <Container>
                <Title>Hi, {user.username}!</Title>
                {sortedDates.map((date) => {
                    const diaryToday = user.diary.filter((entry) => entry.date === date);
                    return (<DailyReview key={date} diaryToday={diaryToday} />)
                })}
            </Container>
        )
    } else {
        return (
            <Navigate to="/user/setup" />
        )
    }
    
};

export default Dashboard;