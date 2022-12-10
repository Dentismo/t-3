import { IconButton, Tooltip } from '@mui/material'

type Props = {
  tooltip?: string
  icon: React.ReactElement
  onClick: () => void
}

const IconAction: React.FC<Props> = ({ tooltip, icon, onClick }) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton onClick={onClick}>{icon}</IconButton>
    </Tooltip>
  )
}

export default IconAction
