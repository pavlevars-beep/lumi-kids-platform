// llms.txt — sažetak sajta za AI asistente i pretraživače (llmstxt.org)
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { workshops } from '../data/workshops';
import { site } from '../data/site';

export const GET: APIRoute = async ({ site: base }) => {
  const posts = (await getCollection('blog')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const u = (p: string) => new URL(p, base).toString();
  const txt = `# ${site.name}

> ${site.description} Sedište: ${site.city}. Područje rada: ${site.serviceArea}. Kontakt: ${site.email}, ${site.phone}. Upit: ${u('/#upit')}

Lumi Kids Studio organizuje dečje programe "ključ u ruke" za firme (Kids Day, Dan porodice, novogodišnji program za decu zaposlenih), vrtiće i škole, institucije, rođendaonice i porodične rođendane. Uključuje koncept i satnicu, prostor (kod klijenta ili Lumi obezbeđuje), prijem i protokol, stručne voditelje radionica, profesionalno fotografisanje sa privatnim galerijama po porodici, osveženje, poklone i dekoraciju. Male grupe (12–16 dece po voditelju), predlog programa i ponuda u roku od ${site.responseTime}.

## Radionice
${workshops.map((w) => `- [${w.name}](${u('/radionice/' + w.slug)}): ${w.short} Uzrast: ${w.ages}. Trajanje: ${w.duration}.`).join('\n')}

## Blog
${posts.map((p) => `- [${p.data.title}](${u('/blog/' + p.id)}): ${p.data.description} (${p.data.author})`).join('\n')}

## Stranice
- [Početna](${u('/')}): za koga radimo, šta uključujemo, primer programa, kako radimo, česta pitanja, forma za upit
- [Katalog radionica](${u('/radionice')})
- [Instagram](${site.instagram})
`;
  return new Response(txt, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
