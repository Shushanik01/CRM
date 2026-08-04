import { Link } from "react-router-dom";
import { useCompanies } from "../hooks/useCompanies";
import { useAllContacts } from "../hooks/useContact";
import { useAllDeals } from "../hooks/useDeals";
import { useSelector } from "react-redux";
import { use } from "react";

export const Dashboard = () => {
    const user = useSelector((state) => state.auth.user);
    const { data: useCompanies } = useCompanies();
    const { data: contactsData } = useAllContacts();
    const { data: dealsData } = useAllDeals();

     const companiesCount = companiesData?.allCompanies?.length || 0;
  const contactsCount = contactsData?.allContacts?.length || 0;
  const dealsCount = dealsData?.allDeals?.length || 0;

  const openDealsValue = dealsData?.allDeals
    ?.filter((deal) => deal.stage !== 'won' && deal.stage !== 'lost')
    .reduce((sum, deal) => sum + deal.value, 0) || 0;

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>

      <div>
        <Link to="/companies">
          <h3>Companies</h3>
          <p>{companiesCount}</p>
        </Link>

        <Link to="/contacts">
          <h3>Contacts</h3>
          <p>{contactsCount}</p>
        </Link>

        <Link to="/deals">
          <h3>Deals</h3>
          <p>{dealsCount}</p>
        </Link>
      </div>

      <div>
        <h3>Open Deals Value</h3>
        <p>${openDealsValue.toLocaleString()}</p>
      </div>
    </div>
  );
}