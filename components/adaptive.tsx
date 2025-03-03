interface FileListWrapperProps {
  children: React.ReactNode
}

export const FileListWrapper: React.FC<FileListWrapperProps> = ({
  children,
}) => {
  return <div>{children}</div>
}
