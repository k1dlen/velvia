-- Создание базы данных
CREATE DATABASE IF NOT EXISTS `velvia` CHARACTER SET utf8mb4;
USE `velvia`;

-- Таблица ролей
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица пользователей
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_role` int NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_role` (`id_role`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица корзин
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица товаров
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(100) NOT NULL,
  `status` enum('На складе','Распродано') NOT NULL,
  `discount` decimal(5,2) DEFAULT NULL,
  `size` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  `high_res_image_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица элементов корзины
CREATE TABLE `cart_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `count` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `cart_id` (`cart_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица статусов заказов
CREATE TABLE `order_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица заказов
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `address` text NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `id_status` int NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_status` (`id_status`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`id_status`) REFERENCES `order_status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица элементов заказа
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `count` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Вставка ролей
INSERT INTO `role` (`id`, `code`, `name`) VALUES
(1, 'user', 'Пользователь'),
(2, 'admin', 'Администратор');

-- Вставка статусов заказов
INSERT INTO `order_status` (`id`, `name`) VALUES
(1, 'Новый'),
(2, 'В обработке'),
(3, 'Отменен'),
(4, 'В пути'),
(5, 'Доставлен'),
(6, 'Ожидает доставки');

-- Вставка администратора 
INSERT INTO `user` (`id`, `id_role`, `login`, `password`, `full_name`, `phone`, `email`) VALUES
(1, 2, 'admin', '$2b$10$9v976YWF4smfC3p1Ny.Nmed4fqUw3q0acVrEpSYqNmY32o8PymNa2', 'admin', 'admin', 'admin@admin.admin');

-- Вставка примеров товаров
-- Полная вставка 20 товаров в таблицу products
INSERT INTO `products` (`id`, `name`, `type`, `status`, `discount`, `size`, `price`, `image_url`, `created_at`, `description`, `high_res_image_url`) VALUES
(1, 'Элегантные австрийские шторы', 'Австрийские', 'На складе', 10.00, '150x250 см', 7599.99, '/images/elegant_austrian.png', '2025-03-04 19:09:54', 'Элегантные австрийские шторы, выполненные в классическом стиле, идеально подходят для создания уютной атмосферы в вашем доме.', '/images/original_res/elegant_austrian.png'),
(2, 'Классические прямые шторы', 'Прямые', 'На складе', NULL, '200x280 см', 5999.99, '/images/classic_straight.png', '2025-03-04 19:09:54', 'Классические прямые шторы, идеально подходят для современного интерьера и дарят чувство простора.', '/images/original_res/classic_straight.png'),
(3, 'Лондонские шторы с узором', 'Лондонские', 'На складе', 15.00, '140x240 см', 8299.99, '/images/london_patterned.png', '2025-03-04 19:09:54', 'Лондонские шторы с изысканным узором, которые станут настоящим акцентом в вашем интерьере.', '/images/original_res/london_patterned.png'),
(4, 'Фактурные плотные шторы', 'Фактурные', 'Распродано', NULL, '180x260 см', 6999.99, '/images/textured_heavy.png', '2025-03-04 19:09:54', 'Фактурные плотные шторы, создающие атмосферу уюта и уединенности.', '/images/original_res/textured_heavy.png'),
(5, 'Римские шторы с паттерном', 'Римские', 'На складе', 5.00, '120x220 см', 4999.99, '/images/roman_patterned.png', '2025-03-04 19:09:54', 'Римские шторы с узором, сочетающие стильный дизайн и удобство использования.', '/images/original_res/roman_patterned.png'),
(6, 'Французские шторы с драпировкой', 'Французские', 'На складе', NULL, '160x250 см', 10499.99, '/images/french_draped.png', '2025-03-04 19:09:54', 'Французские шторы с драпировкой, придающие комнате утонченность и шик.', '/images/original_res/french_draped.png'),
(7, 'Японские панельные шторы', 'Японские', 'Распродано', NULL, '90x300 см', 7999.99, '/images/japanese_panel.png', '2025-03-04 19:09:54', 'Японские панельные шторы, идеально подходящие для тех, кто ценит стиль и лаконичность.', '/images/original_res/japanese_panel.png'),
(8, 'Скандинавские льняные шторы', 'Скандинавские', 'На складе', NULL, '150x260 см', 6799.99, '/images/scandinavian_linen.png', '2025-03-04 19:09:54', 'Скандинавские льняные шторы, создающие спокойную атмосферу в доме.', '/images/original_res/scandinavian_linen.png'),
(9, 'Тюль с цветочным узором', 'Тюль', 'На складе', NULL, '300x280 см', 3499.99, '/images/tulle_patterned.png', '2025-03-04 19:09:54', 'Тюль с цветочным узором, которая добавит нежности и романтики в интерьер.', '/images/original_res/tulle_patterned.png'),
(10, 'Австрийские шторы с бахромой и кистями', 'Австрийские', 'На складе', NULL, '160x270 см', 8899.99, '/images/austrian_valance.png', '2025-03-04 19:09:54', 'Элегантные австрийские шторы с бахромой и кистями, создающие роскошный акцент в интерьере.', '/images/original_res/austrian_valance.png'),
(11, 'Минималистичные прямые шторы', 'Прямые', 'На складе', 10.00, '220x300 см', 6499.99, '/images/straight_minimalist.png', '2025-03-04 19:09:54', 'Минималистичные прямые шторы, подходящие для современных интерьеров и создающие элегантный стиль.', '/images/original_res/straight_minimalist.png'),
(12, 'Лондонские шторы с бархатом', 'Лондонские', 'Распродано', NULL, '150x250 см', 7999.99, '/images/london_velvet.png', '2025-03-04 19:09:54', 'Лондонские шторы с бархатным покрытием, придающие помещению роскошную атмосферу.', '/images/original_res/london_velvet.png'),
(13, 'Фактурные шторы с узором', 'Фактурные', 'На складе', 20.00, '170x280 см', 7299.99, '/images/textured_patterned.png', '2025-03-04 19:09:54', 'Фактурные шторы с узором, которые отлично подходят для создания теплой и уютной обстановки.', '/images/original_res/textured_patterned.png'),
(14, 'Римские шторы с принтом', 'Римские', 'На складе', NULL, '130x230 см', 5299.99, '/images/roman_printed.png', '2025-03-04 19:09:54', 'Римские шторы с принтом — стильное и оригинальное решение для вашего окна.', '/images/original_res/roman_printed.png'),
(15, 'Французские шторы с кружевом', 'Французские', 'На складе', 5.00, '180x270 см', 9599.99, '/images/french_lace.png', '2025-03-04 19:09:54', 'Французские шторы с кружевом, добавляющие романтический шарм в интерьер.', '/images/original_res/french_lace.png'),
(16, 'Японские шторы с графическим дизайном', 'Японские', 'Распродано', NULL, '100x280 см', 8499.99, '/images/japanese_patterned.png', '2025-03-04 19:09:54', 'Японские шторы с графическим дизайном, отлично дополняющие современный интерьер.', '/images/original_res/japanese_patterned.png'),
(17, 'Скандинавские легкие шторы', 'Скандинавские', 'На складе', 15.00, '140x260 см', 5799.99, '/images/scandinavian_light.png', '2025-03-04 19:09:54', 'Скандинавские легкие шторы, идеально подходящие для оформления светлого и воздушного пространства.', '/images/original_res/scandinavian_light.png'),
(18, 'Тюль с вышивкой', 'Тюль', 'На складе', NULL, '280x290 см', 3899.99, '/images/tulle_embroidered.png', '2025-03-04 19:09:54', 'Тюль с вышивкой, создающий изысканную атмосферу в вашем доме.', '/images/original_res/tulle_embroidered.png'),
(19, 'Ажурные вуалевые шторы', 'Вуалевые', 'На складе', NULL, '250x280 см', 4099.99, '/images/voile_lace.png', '2025-03-04 19:09:54', 'Ажурные вуалевые шторы, придающие комнате элегантность и легкость.', '/images/original_res/voile_lace.png'),
(20, 'Блэкаут шторы для затемнения', 'Блэкаут', 'На складе', 25.00, '200x300 см', 9999.99, '/images/blackout_darkening.png', '2025-03-04 19:09:54', 'Блэкаут шторы для затемнения, обеспечивающие надежную защиту от света и шума.', '/images/original_res/blackout_darkening.png');