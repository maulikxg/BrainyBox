import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { Sidebar } from "../components/Sidebar";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { useState } from "react";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);

  async function shareBrain() {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/share`,
      {
        share: true,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const shareUrl = `${BACKEND_URL}/share/${response.data.hash}`;
    alert(shareUrl);
  }
  const contents = useContent();
  return (
    <>
      <div>
        <Sidebar />

        <div className="p-4 ml-72 h-min-screen bg-gray-100 border-2">
          <CreateContentModal
            open={modelOpen}
            onClose={() => {
              setModelOpen(false);
            }}
          />
          <div className="flex justify-end gap-4 pb-5">
            <Button
              startIcon={<PlusIcon size="lg" />}
              variant="primary"
              text="Add Content"
              onClick={() => {
                setModelOpen(() => !modelOpen);
              }}
              size="md"
            />
            <Button
              startIcon={<ShareIcon />}
              variant="secondary"
              text="Share Brain"
              onClick={shareBrain}
              size="md"
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            {contents.map(({ type, link, title }) => (
              <Card title={title} link={link} type={type} />
            ))}
            {/* <Card
              title="Funny memes"
              link="https://x.com/AmanSharma_554/status/1936998382872219819"
              type="x"
            />
            <Card
              title="F1 Race"
              link="https://www.youtube.com/watch?v=oPTZCpo5uOg"
              type="youtube"
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}
