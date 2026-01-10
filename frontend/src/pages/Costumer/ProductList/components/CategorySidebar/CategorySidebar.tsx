import { Box } from "@mui/material";
import CategoryItem from "./CategoryItem";

type Props = {
  categories: string[];
  onSelect: (cat: string) => void;
  // Các props cũ như title, expanded, onToggle không cần nữa
};

const CategorySidebar = ({ categories, onSelect }: Props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      {categories.map((c) => (
        <div key={c} onClick={() => onSelect(c)}>
          <CategoryItem name={c} />
        </div>
      ))}
    </Box>
  );
};

export default CategorySidebar;
