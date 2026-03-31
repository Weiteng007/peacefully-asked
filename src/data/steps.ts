export interface Step {
  id: string
  title: string
  subtitle: string
  placeholder: string
  icon: string
}

export const steps: Step[] = [
  {
    id: 'thought',
    title: '你脑子里划过什么想法？',
    subtitle: '把那个让你不舒服的念头写下来',
    placeholder: '例如：我觉得自己什么都做不好...',
    icon: '💭',
  },
  {
    id: 'emotion',
    title: '你现在的情绪是什么？',
    subtitle: '试着给这个情绪命名，感受它',
    placeholder: '例如：焦虑、沮丧、愤怒、无力感...',
    icon: '🫀',
  },
  {
    id: 'evidence',
    title: '这个想法有什么论据吗？',
    subtitle: '公正地看，事实是什么',
    placeholder: '例如：实际上我上周刚完成了一个项目，得到了好评...',
    icon: '⚖️',
  },
]
