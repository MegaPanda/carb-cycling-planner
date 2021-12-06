import { format } from "date-fns";
import { useNavigate } from "react-router";
import { Cell, Pie, PieChart } from "recharts";
import styled from "styled-components/macro";
import { useFood } from "../custom-hooks/useFood";
import { getConsumedMicros } from "../helpers/helpers";
import { DiaryEntry } from "../redux/reducers/userSlice";

const Container = styled.div`
    margin: 1.5rem 0;
    display: flex;
    box-shadow: rgba(33, 35, 38, 0.1) 0px 12px 12px -10px;
    cursor: pointer;
`;

const Info = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.5rem;

    h3 {
        margin: 0;
        padding-left: 0.5rem;
    }
`;

const ChartWrapper = styled(PieChart)`
    text {
        font-size: 10px;
    }

    text:last-child {
        font-size: 1.5rem;
        font-weight: 900;
    }
`;

const MicrosWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Micro = styled.div`
    width: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
        font-size: 8px;
    }

    h2 {
        margin: 4px 0 0 0;
    }
`;


const DailyReview = ({ diaryToday }: { diaryToday: DiaryEntry[]}) => {
    const food = useFood();
    const navigate= useNavigate();
    const consumedMicros = getConsumedMicros(diaryToday);
    const colors = ["#0088FE", "#00C49F", "#FFBB28"];
    const pieData = [
        { name: "carbs", value: consumedMicros.carbs * 4 },
        { name: "protein", value: consumedMicros.protein * 4 },
        { name: "fat", value: consumedMicros.calories - (consumedMicros.carbs + consumedMicros.protein) * 4 }
    ];

    const handleClick = () => {
        food.setDate(diaryToday[0].date);
        navigate("/user/diary");
    };

    return (
        <Container onClick={() => handleClick()}>
            <Info>
                <h3>{format(new Date(diaryToday[0].date), "dd MMM")}</h3>
                <MicrosWrapper>
                    <Micro>
                        <span>Carbs</span>
                        <h2 css={`color: ${colors[0]};`}>{consumedMicros.carbs}</h2>
                    </Micro>
                    <Micro>
                        <span>Protein</span>
                        <h2 css={`color: ${colors[1]};`}>{consumedMicros.protein}</h2>
                    </Micro>
                    <Micro>
                        <span>Fat</span>
                        <h2 css={`color: ${colors[2]};`}>{consumedMicros.fat}</h2>
                    </Micro>
                </MicrosWrapper>
            </Info>
            <ChartWrapper width={100} height={100}>
                <Pie 
                    data={pieData}
                    innerRadius={38}
                    outerRadius={45}
                    paddingAngle={3}
                    dataKey="value"
                >
                    {pieData.map((micro, index) => <Cell key={micro.name} fill={colors[index]} />)}
                </Pie>
                <text x={50} y={38} textAnchor="middle">Calories</text>
                <text x={50} y={65} textAnchor="middle" >{consumedMicros.calories}</text>
            </ChartWrapper>
        </Container>
    )
};

export default DailyReview;