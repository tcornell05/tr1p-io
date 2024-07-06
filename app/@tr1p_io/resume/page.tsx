import fs from 'fs';
import path from 'path';
import Resume from '@/components/ui/resume';

;

const getResumeContent = async (): Promise<string> => {
  const filePath = path.join(process.cwd(), 'markdown', 'resume.md');
  const markdownContent = fs.readFileSync(filePath, 'utf8');
  return markdownContent;
};

const ResumePage = async () => {
  const markdownContent = await getResumeContent();
  return (
    <>

      <Resume markdownContent={markdownContent} />
    </>
  );
};

export default ResumePage;
