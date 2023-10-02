import LayoutComponent from "../Components/Fixed/LayoutComponent";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import StatusTable from "../Components/StatusPageComponent/StatusTable";


function StatusPage() {
  return (
    <>
      <LayoutComponent>
        <Card sx={{ minWidth: 275, mt: 3, boxShadow: 5 }}>
          <h1 style={{ marginLeft: "1%" }}>History</h1> 
          <CardContent>
          <StatusTable />
          </CardContent>
        </Card>
      </LayoutComponent>
    </>
  );
}

export default StatusPage;
