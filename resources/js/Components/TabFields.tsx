import {  TabsProps } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui";

const TabFields: React.FC<TabsProps> = ({ defaultValue, tabs, className }) => {
  return (
    <Tabs defaultValue={defaultValue} className={className}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger value={tab.value} key={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent value={tab.value} key={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabFields;
