import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./component/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setdata] = useState(null);
  const [filteredData, setfilteredData] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [selectedBtn, setselectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setloading(true);
      try {
        const responce = await fetch(BASE_URL);
        const json = await responce.json();
        setdata(json);
        setfilteredData(json);
        setloading(false);
      } catch (error) {
        seterror("Enable to featch data.");
      }
    };
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue === "") {
      setfilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setfilteredData(filter);
  };

  const filteredFood = (type) => {
    if (type == "all") {
      setfilteredData(data);
      setselectedBtn("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setfilteredData(filter);
    setselectedBtn(type);
  };

  const filterBtn = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/public/FoodyZone.png" alt="logo" />
          </div>
          <div className="search">
            <input onChange={searchFood} placeholder="Search Food" />
          </div>
        </TopContainer>
        <FilterContainer>
          {filterBtn.map((value) => (
            <Button
              isSelected={selectedBtn == value.type}
              key={value.name}
              onClick={() => filteredFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 70px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 5px;
  padding: 40px;
`;

export const Button = styled.button`
  background-color: ${({ isSelected }) => (isSelected ? "#b60101" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #b60101;
  }
`;
