// Autori bloga. Uloge/biografije dopuni po želji.
export const authors: Record<string, { role: string; bio: string }> = {
  'Tijana Varsaković': { role: 'Lumi Kids Studio', bio: 'Osmišljava programe i vodi saradnju sa firmama, vrtićima i institucijama.' },
  'Aleksandra Djordjević': { role: 'Lumi Kids Studio', bio: 'Piše o organizaciji dečjih programa za kompanije i porodično prijateljskim inicijativama.' },
  'Marija Petrović': { role: 'Lumi Kids Studio', bio: 'Piše o radionicama, igri i učenju kroz iskustvo za decu različitog uzrasta.' },
};
export const initials = (n: string) => n.split(' ').map((p) => p[0]).join('');
