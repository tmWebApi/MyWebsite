//USE [ShoppingWebsite]
//GO
///****** Object:  Table [dbo].[CATEGORIES]    Script Date: 27/12/2022 01:52:39 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO
//CREATE TABLE [dbo].[CATEGORIES](
//	[CATEGORY_ID] [int] IDENTITY(1,1) NOT NULL,
//	[NAME] [nvarchar](50) NOT NULL,
//PRIMARY KEY CLUSTERED 
//(
//	[CATEGORY_ID] ASC
//)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
//) ON [PRIMARY]
//GO
///****** Object:  Table [dbo].[ORDER_ITEMS]    Script Date: 27/12/2022 01:52:39 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO
//CREATE TABLE [dbo].[ORDER_ITEMS](
//	[ORDER_ITEM_ID] [int] IDENTITY(1,1) NOT NULL,
//	[ORDER_ID] [int] NOT NULL,
//	[PRODUCT_ID] [int] NOT NULL,
//	[QUANTITY] [int] NOT NULL,
// CONSTRAINT [PK_ORDER_ITEMS] PRIMARY KEY CLUSTERED 
//(
//	[ORDER_ITEM_ID] ASC
//)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
//) ON [PRIMARY]
//GO
///****** Object:  Table [dbo].[ORDERS]    Script Date: 27/12/2022 01:52:39 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO
//CREATE TABLE [dbo].[ORDERS](
//	[ORDER_ID] [int] IDENTITY(1,1) NOT NULL,
//	[DATE] [date] NOT NULL,
//	[PRICE] [float] NOT NULL,
//	[USER_ID] [int] NOT NULL,
// CONSTRAINT [PK_ORDERS] PRIMARY KEY CLUSTERED 
//(
//	[ORDER_ID] ASC
//)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
//) ON [PRIMARY]
//GO
///****** Object:  Table [dbo].[PRODUCTS]    Script Date: 27/12/2022 01:52:39 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO
//CREATE TABLE [dbo].[PRODUCTS](
//	[PRODUCT_ID] [int] IDENTITY(1,1) NOT NULL,
//	[NAME] [nvarchar](50) NOT NULL,
//	[DESCRIPTION] [nvarchar](max) NOT NULL,
//	[CATEGORY_ID] [int] NOT NULL,
//	[PRICE] [int] NOT NULL,
//	[IMG_URL] [nvarchar](max) NOT NULL,
//PRIMARY KEY CLUSTERED 
//(
//	[PRODUCT_ID] ASC
//)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
//) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
//GO
///****** Object:  Table [dbo].[USERS]    Script Date: 27/12/2022 01:52:39 ******/
//SET ANSI_NULLS ON
//GO
//SET QUOTED_IDENTIFIER ON
//GO
//CREATE TABLE [dbo].[USERS](
//	[USER_ID] [int] IDENTITY(1,1) NOT NULL,
//	[USER_NAME] [nvarchar](50) NOT NULL,
//	[PASSWORD] [nvarchar](50) NOT NULL,
//	[FIRST_NAME] [nvarchar](50) NULL,
//	[LAST_NAME] [nvarchar](50) NULL,
// CONSTRAINT [PK_USERS] PRIMARY KEY CLUSTERED 
//(
//	[USER_ID] ASC
//)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
//) ON [PRIMARY]
//GO
//SET IDENTITY_INSERT [dbo].[CATEGORIES] ON 

//INSERT [dbo].[CATEGORIES] ([CATEGORY_ID], [NAME]) VALUES (1, N'משחקי חברה')
//INSERT [dbo].[CATEGORIES] ([CATEGORY_ID], [NAME]) VALUES (2, N'קלפים')
//INSERT [dbo].[CATEGORIES] ([CATEGORY_ID], [NAME]) VALUES (3, N'פליימוביל')
//INSERT [dbo].[CATEGORIES] ([CATEGORY_ID], [NAME]) VALUES (4, N'צעצועים')
//SET IDENTITY_INSERT [dbo].[CATEGORIES] OFF
//GO
//SET IDENTITY_INSERT [dbo].[ORDERS] ON 

//INSERT [dbo].[ORDERS] ([ORDER_ID], [DATE], [PRICE], [USER_ID]) VALUES (1, CAST(N'2022-12-21' AS Date), 540, 2)
//SET IDENTITY_INSERT [dbo].[ORDERS] OFF
//GO
//SET IDENTITY_INSERT [dbo].[PRODUCTS] ON 

//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (1, N'בימבה', N' ילדים קטנים יכולים לרכוב בעצמם או להשתמש בהם כצעצוע דחיפה.', 4, 90, N'bimba.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (2, N'טלפון מדבר לתינוקות', N'
//מעודד משחק תפקידים מוקדם כאשר תינוקות ופעוטות מעמידים פנים שהם עושים ''שיחות''', 4, 42, N'chatterTelephone.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (4, N'צעצוע לערימת טבעות', N'מציע כיף ערימה קלאסי לתינוקות. הוא כולל בסיס נדנדה מתנודד ו-5 טבעות צבעוניות לידיים קטנות לאחוז ולערימה. הערמה עוזרת לתינוק לפתח תיאום עין-יד ומציגה לו את הרעיון של גודל יחסי כשהם לומדים למיין ולערום מהגדול לקטן ביותר!', 4, 30, N'ringStacking.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (6, N'מבוך חרוזים לתינוקות', N'צעצוע פעילות מבוך חרוז גחמני עם 3 קשתות צבעוניות להזזה של חרוזים', 4, 38, N'chasingRainbows.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (7, N'מסלול מכוניות מתגלגל', N'כיף התפתחותי. מסייע בבניית קואורדינציה עין יד', 4, 120, N'carTrack.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (8, N'הסעת תלמידים', N'הסעת תלמידים ', 3, 110, N'yellowBus.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (9, N'מכולה על משאית', N'מדמה פעילות נמל אמיתית', 3, 100, N'containerTruck.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (10, N'ספינה משטרתית', N'משטרת חופים', 3, 150, N'PoliceBoat.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (11, N'מרפאה', N'מרפאה עם רופאה וחולים', 3, 160, N'clinic.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (12, N'טרקטור', N'טרקטור עם ערימות חציר', 3, 130, N'tractor.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (13, N'רכב ימ"מ משוריין', N'רכב ימ"מ משוריין מדליק אורות', 3, 120, N'prisonerPolice.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (14, N'סירה עם צוללן', N'צוללת עם צוללן כולל חליפת צלילה', 3, 85, N'submarine.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (15, N'סירת אבובים', N'סירה עם 2 אבובים הנמשכים אחריה בחוטים', 3, 120, N'BoatAndTubes.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (17, N'לוח עץ עם צורות', N'משחק התפתחותי מפתח יכולת להתאים צורה לתבנית', 4, 25, N'woodenBoard.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (19, N'Rummikub', N'?????', 1, 100, N'rummikub.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (20, N'מה המצב', N'?????', 1, 60, N'whatTurtle.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (21, N'חיות במשבצות', N'?????', 1, 90, N'LiveInSlots.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (22, N'4 בשורה', N'?????', 1, 50, N'4inRow.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (23, N'RACE', N'?????', 2, 48, N'race.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (24, N'מרוץ הגבינה', N'?????', 2, 40, N'cheeseRace.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (25, N'מתקתקים', N'???', 2, 40, N'sweets.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (26, N'מלך הפלאפל', N'????', 2, 45, N'kingOfFalafel.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (27, N'זוג או פח', N'??????', 2, 35, N'pairOrTin.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (28, N'דאבל', N'????', 2, 30, N'dubel.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (29, N'סודוקו', N'????', 1, 70, N'sudoku.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (30, N'מסיבת מנגל', N'?????', 1, 84, N'BBQparty.jpg')
//INSERT [dbo].[PRODUCTS] ([PRODUCT_ID], [NAME], [DESCRIPTION], [CATEGORY_ID], [PRICE], [IMG_URL]) VALUES (31, N'בלאנקו', N'????', 1, 90, N'blanko.jpg')
//SET IDENTITY_INSERT [dbo].[PRODUCTS] OFF
//GO
//SET IDENTITY_INSERT [dbo].[USERS] ON 

//INSERT [dbo].[USERS] ([USER_ID], [USER_NAME], [PASSWORD], [FIRST_NAME], [LAST_NAME]) VALUES (2, N'tami@gmail.com', N'7252', N'tami', N'birenbaum')
//INSERT [dbo].[USERS] ([USER_ID], [USER_NAME], [PASSWORD], [FIRST_NAME], [LAST_NAME]) VALUES (4, N'a6789@gmail.com', N'a789$G', N'avi', N'melamed')
//SET IDENTITY_INSERT [dbo].[USERS] OFF
//GO
//ALTER TABLE [dbo].[ORDER_ITEMS]  WITH CHECK ADD  CONSTRAINT [ORDER_ITEMS_ORDER_fk] FOREIGN KEY([ORDER_ID])
//REFERENCES [dbo].[ORDERS] ([ORDER_ID])
//GO
//ALTER TABLE [dbo].[ORDER_ITEMS] CHECK CONSTRAINT [ORDER_ITEMS_ORDER_fk]
//GO
//ALTER TABLE [dbo].[ORDER_ITEMS]  WITH CHECK ADD  CONSTRAINT [ORDER_ITEMS_PRODUCT_fk] FOREIGN KEY([PRODUCT_ID])
//REFERENCES [dbo].[PRODUCTS] ([PRODUCT_ID])
//GO
//ALTER TABLE [dbo].[ORDER_ITEMS] CHECK CONSTRAINT [ORDER_ITEMS_PRODUCT_fk]
//GO
//ALTER TABLE [dbo].[ORDERS]  WITH CHECK ADD  CONSTRAINT [ORDER_USER_fk] FOREIGN KEY([USER_ID])
//REFERENCES [dbo].[USERS] ([USER_ID])
//GO
//ALTER TABLE [dbo].[ORDERS] CHECK CONSTRAINT [ORDER_USER_fk]
//GO
//ALTER TABLE [dbo].[PRODUCTS]  WITH CHECK ADD  CONSTRAINT [PRODUCTS_CATEGORY_ID_fk] FOREIGN KEY([CATEGORY_ID])
//REFERENCES [dbo].[CATEGORIES] ([CATEGORY_ID])
//GO
//ALTER TABLE [dbo].[PRODUCTS] CHECK CONSTRAINT [PRODUCTS_CATEGORY_ID_fk]
//GO
