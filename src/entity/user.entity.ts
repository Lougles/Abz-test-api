import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContentFile } from './content.file.entity';
import { Position } from './position.entity';

@Entity('user_entity')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  // @Column({ type: 'int', nullable: false, name: 'profile_image_id' })
  // profileImageId: number;

  // @Column({ type: 'varchar', nullable: false, length: 255, name: 'file_path' })
  // filePath: string;

  // @Column({ type: 'int', nullable: false, name: 'position' })
  // position: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Position, (position: Position) => position.users)
  position: Position;

  // @OneToOne(() => ContentFile, (contentFile: ContentFile) => contentFile.user)
  // @JoinColumn({ name: 'profile_image_id' })
  // userImg: ContentFile;
  @OneToOne(() => ContentFile)
  @JoinColumn()
  photo: ContentFile;
}
