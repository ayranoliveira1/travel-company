import QuickSearch from "./components/QuickSearch";
import RecommendeTrips from "./components/RecommendTrips";
import Search from "./components/TripInput/search";

export default function Home() {
   return (
      <>
         <Search />
         <QuickSearch />
         <RecommendeTrips />
      </>
   );
}
