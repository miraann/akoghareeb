-- Optional seed data — the content that shipped with the static mockups,
-- carried over so a fresh Supabase project isn't empty on first deploy.
-- Safe to skip entirely; the admin panel can create everything from scratch.
-- Run after 0001_init.sql.

insert into public.paintings
  (title_ku, title_en, title_ar, description_ku, description_en, description_ar, medium_ku, medium_en, medium_ar, category, year)
values
  ($t$ئاگری نەورۆز$t$, $t$Newroz Fire$t$, $t$نار نوروز$t$,
   $t$بڵێسەی نەورۆز بەسەر چیاکاندا هەڵدەستێت، بە یەک بڵێسەی ڕەنگ چەندین سەدە نوێبوونەوە و بەرگری هەڵدەگرێت.$t$,
   $t$The flames of Newroz rise over the mountains, carrying centuries of renewal and resistance in a single blaze of color.$t$,
   $t$تتصاعد ألسنة نيران نوروز فوق الجبال، حاملةً قرونًا من التجدد والمقاومة في وميض واحد من الألوان.$t$,
   $t$ڕەنگی ڕۆن لەسەر کانڤاس$t$, $t$Oil on canvas$t$, $t$زيت على قماش$t$,
   'historical', 2016),

  ($t$ڕێپێوانی درێژ$t$, $t$The Long March$t$, $t$المسيرة الطويلة$t$,
   $t$کاروانێک لە خێزان سنوورێکی بێناو دەبڕنەوە، سیمایان گرانی و شکۆمەندی ئاوارەیی هەڵدەگرێت.$t$,
   $t$A procession of families crosses an unnamed border, their silhouettes carrying the weight and dignity of displacement.$t$,
   $t$موكب من العائلات يعبر حدودًا بلا اسم، تحمل ظلالهم ثقل النزوح وكرامته.$t$,
   $t$ڕەنگی ڕۆن لەسەر کانڤاس$t$, $t$Oil on canvas$t$, $t$زيت على قماش$t$,
   'historical', 2011),

  ($t$گەڕانەوە بۆ گوند$t$, $t$Return to the Village$t$, $t$العودة إلى القرية$t$,
   $t$بنیاتنانەوە بە بۆیاخکردنەوەی یەک دەرگا دەستپێدەکات — لێکۆڵینەوەیەکی هێمن دەربارەی گەڕانەوە دوای زیان.$t$,
   $t$Rebuilding begins with a single door repainted — a quiet study of homecoming after loss.$t$,
   $t$تبدأ إعادة البناء بإعادة طلاء باب واحد — تأمل هادئ في العودة بعد الفقد.$t$,
   $t$ئەکریلیک لەسەر کانڤاس$t$, $t$Acrylic on canvas$t$, $t$أكريليك على قماش$t$,
   'historical', 2019),

  ($t$یاریزانی مۆفتوونەکان$t$, $t$The Puppeteer$t$, $t$محرّك الدمى$t$,
   $t$لێکۆڵینەوەیەکی گاڵتەجاڕانە دەربارەی دەسەڵاتێک کە گوریسی ڕادەکێشێت و بەردەوام نکۆڵی لێدەکات.$t$,
   $t$A satirical study of power pulling strings it insists it does not hold.$t$,
   $t$دراسة ساخرة عن سلطة تسحب الخيوط بينما تنفي دائمًا أنها تفعل.$t$,
   $t$مەرەکەب لەسەر کاغەز$t$, $t$Ink on paper$t$, $t$حبر على ورق$t$,
   'political', 2014),

  ($t$بەڵێنە بەتاڵەکان$t$, $t$Empty Promises$t$, $t$وعود فارغة$t$,
   $t$مێزێکی وتار، مایکرۆفۆنێک و بۆشاییەکی گفتوگۆ کە بەلایەنی خۆیدا بەتاڵ هێڵراوە.$t$,
   $t$A podium, a microphone, and a speech bubble left deliberately blank.$t$,
   $t$منصة، ميكروفون، وفقاعة كلام تُركت فارغة عن قصد.$t$,
   $t$مەرەکەب لەسەر کاغەز$t$, $t$Ink on paper$t$, $t$حبر على ورق$t$,
   'political', 2017),

  ($t$تەختی لمی$t$, $t$Throne of Sand$t$, $t$عرش من الرمل$t$,
   $t$دەسەڵات وەک کاتژمێری لم وێنە دەکرێت — شکۆدار، بەڵام بەهێمنی بەرەو کۆتایی دەڕوات.$t$,
   $t$Authority rendered as an hourglass — magnificent, and quietly running out.$t$,
   $t$السلطة تُرسم كساعة رملية — مهيبة، وتنفد بهدوء.$t$,
   $t$تەکنیکی تێکەڵ لەسەر کانڤاس$t$, $t$Mixed media on canvas$t$, $t$تقنية مختلطة على قماش$t$,
   'political', 2020),

  ($t$چنراو$t$, $t$The Weaver$t$, $t$الحائكة$t$,
   $t$دەستێک کە هەزاران نەخشی هەڵگرتووە، لە نیوەی چنیندا وێنە کراوە.$t$,
   $t$Hands that have carried a thousand patterns, captured mid-thread.$t$,
   $t$يدان حملتا ألف نقشٍ، في لحظة غزل الخيط.$t$,
   $t$ڕەنگی ڕۆن لەسەر کانڤاس$t$, $t$Oil on canvas$t$, $t$زيت على قماش$t$,
   'portraits', 2013),

  ($t$پیری چیاکان$t$, $t$Elder of the Mountains$t$, $t$شيخ الجبال$t$,
   $t$ڕووێک بە با و ساڵان نەخشێنراوە، بە هێمنیی شایانی خۆی وێنە کراوە.$t$,
   $t$A face mapped by wind and years, painted with the patience it deserves.$t$,
   $t$وجهٌ رسمته الريح والسنون، رُسم بالصبر الذي يستحقه.$t$,
   $t$ڕەنگی ڕۆن لەسەر کانڤاس$t$, $t$Oil on canvas$t$, $t$زيت على قماش$t$,
   'portraits', 2015),

  ($t$کۆلبەر$t$, $t$Kolbar$t$, $t$كولبر$t$,
   $t$پۆرترێتی کۆلبەرانێک کە ئابووری هەرێمێک لەسەر شانیان هەڵدەگرن.$t$,
   $t$A portrait of the border porters who carry a region's economy on their backs.$t$,
   $t$بورتريه لحمّالي الحدود الذين يحملون اقتصاد منطقة بأكملها على ظهورهم.$t$,
   $t$خەڵووز لەسەر کاغەز$t$, $t$Charcoal on paper$t$, $t$فحم على ورق$t$,
   'portraits', 2018);

insert into public.exhibitions
  (year, title_ku, title_en, title_ar, details_ku, details_en, details_ar)
values
  ('1998', $t$یەکەم پێشانگای تاکە کەسی$t$, $t$First Solo Exhibition$t$, $t$أول معرض فردي$t$,
   $t$«یەکەم فڵچەکان» لە ناوەندێکی کولتووری خۆجێیی کرایەوە — یەکەم دەرکەوتنی گشتی کۆمەڵە کارێک کە بۆ چەندین دەیە گەشەی کرد.$t$,
   $t$"First Brushes" opens at a local cultural center — the earliest public showing of a body of work that would grow for decades.$t$,
   $t$افتتاح "أولى الفرشاة" في مركز ثقافي محلي — أول ظهور عام لمجموعة أعمال استمرت في النمو لعقود.$t$),

  ('2005', $t$ناسینەوەی نیشتمانی$t$, $t$National Recognition$t$, $t$اعتراف وطني$t$,
   $t$لە بیناڵێکی نیشتمانی هونەرە جوانەکاندا خەڵات وەرگرت لەبەر تابلۆیەکی مێژوویی دەربارەی کۆچ و یادگاری.$t$,
   $t$Awarded at a national fine arts biennial for a historical painting exploring migration and memory.$t$,
   $t$حصل على جائزة في بينالي وطني للفنون الجميلة عن لوحة تاريخية تتناول الهجرة والذاكرة.$t$),

  ('2011', $t$گەشتی ڕێپێوانی درێژ$t$, $t$The Long March Tour$t$, $t$جولة المسيرة الطويلة$t$,
   $t$زنجیرەیەک دەربارەی ئاوارەیی بە پێشانگا هەرێمییەکاندا گەشتی کرد، یەکەم سەرنجی ڕەخنەگرانەی فراوانی بۆ ڕاکێشا.$t$,
   $t$A series on displacement travels through regional galleries, drawing the first wide critical attention.$t$,
   $t$جالت سلسلة عن النزوح في معارض إقليمية، لتحظى بأول اهتمام نقدي واسع.$t$),

  ('2016', $t$زنجیرەی نەورۆز$t$, $t$The Newroz Series$t$, $t$سلسلة نوروز$t$,
   $t$پێشانگایەکی گەورەی تاکە کەسی لە مۆزەخانەیەکی هونەری هاوچەرخی هەرێمیدا، بە کارە گەورەکانی مێژوویی بەستراوەتەوە.$t$,
   $t$A major solo exhibition at a regional museum of modern art, anchored by large-scale historical works.$t$,
   $t$معرض فردي كبير في متحف إقليمي للفن الحديث، تمحور حول أعمال تاريخية واسعة النطاق.$t$),

  ('2019', $t$ژیانێک لەسەر کانڤاس — کۆکراوە$t$, $t$A Life on Canvas — Retrospective$t$, $t$حياة على القماش — معرض استعادي$t$,
   $t$بیست ساڵ کار لە پێشانگایەکی کۆکراوەی درێژایی کارەکەیدا کۆکرانەوە.$t$,
   $t$Two decades of work brought together in a career-spanning retrospective.$t$,
   $t$جمع عقدين من الأعمال في معرض استعادي يغطي مسيرة الفنان.$t$),

  ('2023', $t$پیشاندانی گروپی نێودەوڵەتی$t$, $t$International Group Showcase$t$, $t$معرض جماعي دولي$t$,
   $t$چەند کارێکی هەڵبژێردراو بەشدارن لە پێشانگایەکی نێودەوڵەتیدا کە تیشک دەخاتە سەر هونەرمەندە هاوچەرخەکانی دیاسپۆرای کورد.$t$,
   $t$Selected works join an international exhibition spotlighting the Kurdish diaspora's contemporary artists.$t$,
   $t$شاركت أعمال مختارة في معرض دولي يسلّط الضوء على فناني الشتات الكردي المعاصرين.$t$);

insert into public.press_media
  (title_ku, title_en, title_ar, excerpt_ku, excerpt_en, excerpt_ar, source, url, date, type)
values
  ($t$لە ستۆدیۆدا لەگەڵ ئاکۆ غەریب$t$, $t$In the Studio with Ako Gharib$t$, $t$في الاستوديو مع آكو غريب$t$,
   $t$گفتوگۆیەک دەربارەی یادگاری، گاڵتەجاڕی و سی ساڵ لەلای ئیزلێ.$t$,
   $t$A conversation about memory, satire, and thirty years at the easel.$t$,
   $t$حوار عن الذاكرة والسخرية وثلاثين عامًا أمام الحامل.$t$,
   'Kurdistan Arts Review', 'https://example.com', '2023-04-12', 'interview'),

  ($t$وێنەکێشانی دەسەڵات: گفتوگۆیەک دەربارەی کاریکاتێری سیاسی$t$, $t$Painting Power: A Conversation on Political Caricature$t$, $t$رسم السلطة: حوار حول الكاريكاتير السياسي$t$,
   $t$دەربارەی گاڵتەجاڕی وەک ئامرازی ڕاستگۆیی، و ئەو هێڵەی نێوان ڕەخنە و دڵڕەقی.$t$,
   $t$On humor as a tool of honesty, and where the line falls between satire and cruelty.$t$,
   $t$عن الفكاهة كأداة للصدق، وأين يقع الخط بين السخرية والقسوة.$t$,
   'Independent Arts Podcast', 'https://example.com', '2021-11-03', 'interview'),

  ($t$کۆکراوەیەک شایانی چاوەڕوانی بوو$t$, $t$A Retrospective Worth the Wait$t$, $t$معرض استعادي يستحق الانتظار$t$,
   $t$چاوێکی ڕەخنەیی بۆ بیست ساڵ وێنەکێشانی مێژوویی و نیشتمانی.$t$,
   $t$A critical look at two decades of historical and national painting.$t$,
   $t$قراءة نقدية لعقدين من الرسم التاريخي والوطني.$t$,
   'Regional Culture Quarterly', 'https://example.com', '2019-09-20', 'article'),

  ($t$زنجیرەی نەورۆز ڕووناکی دەخاتە سەر مۆزەخانەی هەرێمی$t$, $t$The Newroz Series Lights Up the Regional Museum$t$, $t$سلسلة نوروز تضيء المتحف الإقليمي$t$,
   $t$ئاگر، ڕەنگ و بەردەوامی — پێداچوونەوەیەک بۆ گەورەترین پێشانگای تاکە کەسی هونەرمەندەکە.$t$,
   $t$Fire, color, and continuity — a review of the artist's most ambitious solo show to date.$t$,
   $t$نار ولون واستمرارية — مراجعة لأطمح معرض فردي للفنان حتى الآن.$t$,
   'Erbil Cultural Times', 'https://example.com', '2016-06-08', 'article'),

  ($t$ڕووەکانی دیاسپۆرای کورد: پۆرتفۆلیۆیەک$t$, $t$Faces of the Kurdish Diaspora: A Portfolio$t$, $t$وجوه الشتات الكردي: ملف بصري$t$,
   $t$پۆرتفۆلیۆیەکی هەڵبژێردراو کە پۆرترێت لە درێژایی کارەکەی هونەرمەندەکە پیشان دەدات.$t$,
   $t$A curated portfolio featuring portraits from across the artist's career.$t$,
   $t$ملف مختار يضم بورتريهات من مسيرة الفنان.$t$,
   'Diaspora Voices Magazine', 'https://example.com', '2023-02-14', 'publication'),

  ($t$کۆلبەر: گرانی ئەوەی هەڵیدەگرن$t$, $t$Kolbar: The Weight They Carry$t$, $t$كولبر: ثقل ما يحملونه$t$,
   $t$وتارێک هاوپۆل لەگەڵ زنجیرەی پۆرترێتی خەڵووزی دەربارەی کۆلبەران.$t$,
   $t$An essay accompanying the charcoal portrait series on border porters.$t$,
   $t$مقال مرافق لسلسلة بورتريهات الفحم عن حمّالي الحدود.$t$,
   'Northern Gazette Culture Desk', 'https://example.com', '2020-01-27', 'publication');

-- Biography section — the eyebrow/heading/intro plus the four paragraph
-- blocks, seeded with the same copy the site already falls back to (see
-- messages/*.json), so the admin form isn't empty. image_url is left null
-- for each block — the site shows placeholder art until real portrait
-- photos are uploaded via /admin/biography/blocks/[id].
insert into public.biography_intro
  (id, eyebrow_ku, eyebrow_en, eyebrow_ar, heading_ku, heading_en, heading_ar, intro_ku, intro_en, intro_ar)
values
  (1,
   $t$هونەرمەند$t$, $t$The Artist$t$, $t$الفنان$t$,
   $t$ژیانێک بۆ کانڤاس$t$, $t$A Life Devoted to the Canvas$t$, $t$حياة كُرِّست للوحة$t$,
   $t$ئاکۆ غەریب تەمەنێکی خۆی بەخشیوە بۆ گواستنەوەی یادگاری، خەبات و گاڵتەجاڕی گەلی کورد بۆ سەر کانڤاس.$t$,
   $t$Ako Gharib has spent a lifetime translating the memory, struggle, and humor of the Kurdish people into paint.$t$,
   $t$أمضى آكو غريب حياته في ترجمة ذاكرة الشعب الكردي ونضاله وسخريته إلى لوحات.$t$)
on conflict (id) do update set
  eyebrow_ku = excluded.eyebrow_ku,
  eyebrow_en = excluded.eyebrow_en,
  eyebrow_ar = excluded.eyebrow_ar,
  heading_ku = excluded.heading_ku,
  heading_en = excluded.heading_en,
  heading_ar = excluded.heading_ar,
  intro_ku = excluded.intro_ku,
  intro_en = excluded.intro_en,
  intro_ar = excluded.intro_ar;

insert into public.biography_blocks
  (body_ku, body_en, body_ar, sort_order)
values
  ($t$لە خاکێکەوە کە چیاکان و کۆچکردن شێوەیان داوە، ئاکۆ غەریب پێش خوێندنەوە فێری وێنەکێشان بوو — وێنەی ڕووی پیرەکان، چینەکانی جلوبەرگی نەریتی و سیمای وڵاتێکی دەکێشا کە زۆرجار مشتومڕی لەسەرە بەڵام هەرگیز لەبیر ناکرێت.$t$,
   $t$Born into a land shaped by mountains and migration, Ako Gharib first learned to draw before he learned to write — sketching the faces of elders, the folds of traditional dress, and the silhouettes of a homeland often contested but never forgotten.$t$,
   $t$وُلد في أرضٍ شكّلتها الجبال والهجرة، وتعلّم آكو غريب الرسم قبل أن يتعلّم الكتابة — كان يرسم وجوه الكبار، وتفاصيل الأزياء التقليدية، وملامح وطنٍ كثيرًا ما نوزع عليه لكنه لم يُنسَ أبدًا.$t$,
   0),

  ($t$کارە مێژووی و نیشتمانییەکانی چیرۆکی درێژی ناسنامەی کوردی دەگێڕنەوە: ڕاپەڕین و خۆڕاگری بێدەنگ، جەژن و ڕاپەڕین، بە ڕێزێکی مێژوونووسانە و دەستێکی ڕاهێنراو لە ڕیالیزمی کلاسیکیدا وێنە دەکرێن.$t$,
   $t$His historical and national works trace the long arc of Kurdish identity: uprisings and quiet resilience, festivals and exile, rendered with the reverence of a chronicler and the hand of a painter trained in classical realism.$t$,
   $t$تتبّع أعماله التاريخية والوطنية المسار الطويل للهوية الكردية: انتفاضات وصمود هادئ، أعياد ومنفى، مرسومة بإجلال المؤرِّخ وحرفية رسّام تدرّب على الواقعية الكلاسيكية.$t$,
   1),

  ($t$لەگەڵ ئەمەشدا، هێڵێکی تیژتر و زیرەکترمان لە کاریکاتێرە سیاسییەکانیدا دەبینین — گفتوگۆیەکی چەند دەیەیی لەگەڵ دەسەڵات، بە گاڵتەجاڕییەک کە تیژە بۆ خەڵەتاندن و ڕاستە بۆ ئازاردان.$t$,
   $t$Alongside this, a sharper, wittier line runs through his political caricatures — a decades-long conversation with power, drawn with humor sharp enough to disarm and honest enough to sting.$t$,
   $t$وإلى جانب ذلك، يمتد خطّ أكثر حدّة وذكاءً في كاريكاتيره السياسي — حوار طويل الأمد مع السلطة، رُسم بروح فكاهية حادة بما يكفي لنزع السلاح، وصادقة بما يكفي لتوجع.$t$,
   2),

  ($t$لە پۆرترێتەکانیدا، هەردوو ورەیە یەکدەگرنەوە: هەر کەسێک، بەناوبانگ یان نەناسراو، وەک مێژوویەکی بەردەوام وێنە دەکرێت — ڕووێک کە شایانی بیرکردنەوەیە.$t$,
   $t$In his portraits, the two impulses meet: every subject, famous or unnamed, is painted as history in progress — a face worth remembering.$t$,
   $t$وفي بورتريهاته يلتقي الدافعان معًا: كل شخصية، مشهورة كانت أم مجهولة، تُرسم بوصفها تاريخًا في طور التكوّن — وجهًا يستحق أن يُتذكَّر.$t$,
   3);
