import { Button } from "@/components/ui/button.tsx";
import { SEARCH, updateSearch } from "@/features/pagination/paginationSlice.js";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const SearchInput = () => {
	const dispatch = useDispatch();
	const searchValue = useSelector(SEARCH);
	const inputRef = useRef(null);

	const handleInput = useCallback(
		(e) => {
			dispatch(updateSearch(e.target.value));
		},
		[dispatch]
	);

	useEffect(() => {
		searchValue && inputRef.current.focus();
	}, [searchValue]);

	return (
		<div className="relative flex items-center justify-center w-1/3 ">
			<Search className="absolute left-3" color="grey" size={20} />
			<input
				type="text"
				placeholder="Search"
				className="w-full px-10 py-2 leading-none text-gray-800 rounded placeholder:Search bg-bg-neumorphism shadow-neumorphism-inner focus:shadow-neumorphism-inner focus:outline-none"
				value={searchValue}
				onInput={handleInput}
				ref={inputRef}
			/>
			{searchValue && (
				<Button
					className="absolute right-0"
					variant="link"
					onClick={(e) => {
						e.preventDefault();
						dispatch(updateSearch(""));
					}}
				>
					<X color="grey" />
				</Button>
			)}
		</div>
	);
};

export default SearchInput;
