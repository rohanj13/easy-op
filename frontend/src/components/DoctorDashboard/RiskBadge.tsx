import { Badge, Tag } from "antd";
import { getRiskLevel } from "../../utils/riskLevelUtils";


const RiskBadge = ({ riskScore }: { riskScore?: number }) => {
  const { color, text } = getRiskLevel(riskScore);
  return (
    <Badge count={<Tag color={color} style={{ fontWeight: "bold" }}>{riskScore !== undefined ? `${riskScore} - ${text}` : text}</Tag>} />
  );
};

export default RiskBadge;